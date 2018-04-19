import { models, sequelize } from '../models/index';
import { EmailAttributes, EmailInstance } from '../models/interfaces/EmailInterface';
import { Transaction } from 'sequelize';
import { userService } from './UserService';
import { Request } from 'express';
import { EmailRecipientAttributes, EmailRecipientInstance } from '../models/interfaces/EmailRecipientInterface';
import { UserInstance } from '../models/interfaces/UserInterface';

const Op = sequelize.Op;

export class EmailService {
  createEmail(emailAttributes: EmailAttributes): Promise<EmailInstance> {
    let promise = new Promise<EmailInstance>((resolve, reject) => {
      sequelize.transaction(() => {
        return models.Email
          .create(emailAttributes)
          .then((emailInstance: EmailInstance) => {
            resolve(emailInstance);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
    return promise;
  }

  getInboxEmails(req: Request): Promise<EmailInstance[]> {
    return new Promise<EmailInstance[]>((resolve, reject) => {
      userService.retrieveUser(req['authData'].username).then((user: UserInstance) => {
        const user_id = user.dataValues.id;
        const currentPage: number = req.query.page || 1;
        const offset = (currentPage - 1) * 50;
        const limit = 50;

        sequelize.transaction(() => {
          return models.EmailRecipient.findAll({ where: { user_id, recipient_type: { [Op.or]: ['cc', 'bcc', 'to'] } }, order: [['created_at', 'DESC']], offset, limit }).then((emailRecipients: EmailRecipientInstance[]) => {
            const allEmailIds: number[] = [];
            emailRecipients.forEach((email: EmailRecipientInstance) => {
              allEmailIds.push(email.dataValues.email_id);
            });
            sequelize.transaction(() => {
              return models.Email.findAll({
                where: { id: allEmailIds },
                order: [['created_at', 'DESC']],
                attributes: ["id", "sent_by", "subject", "created_at"]
              })
                .then((emails) => {
                  let allSentByEmails: string[] = [];
                  emails.forEach((email) => {
                    let sent_by = email.dataValues.sent_by.split("<")[1];
                    sent_by = sent_by.substr(0, sent_by.length - 1);
                    allSentByEmails.push(sent_by);
                  });

                  userService.getUserNamesByEmailIds(allSentByEmails).then((userNames) => {
                    emails.forEach((email) => {
                      let sent_by = email.dataValues.sent_by.split("<")[1];
                      sent_by = sent_by.substr(0, sent_by.length - 1);
                      email.dataValues.sent_by = userNames[sent_by];
                    });

                    resolve(emails);
                  });
                }).catch((err: Error) => {
                  reject(err);
                });
            });
          }).catch((err: Error) => {
            reject(err);
          });
        });
      });
    });
  }

  getTotalEmails(req: Request): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      userService.retrieveUser(req['authData'].username).then((user: UserInstance) => {
        const user_id = user.dataValues.id;
        sequelize.transaction(() => {
          const page_type = req.query.type;
          let recipient_type = page_type === 'sent' ? 'sender' : { [Op.or]: ['to', 'bcc', 'cc'] };
          return models.EmailRecipient.count({
            where: {
              user_id,
              recipient_type: recipient_type
            }
          }).then((count: number) => {
            resolve(count);
          }, (err: Error) => { reject(err); });
        });
      });
    });
  }

  getSentEmails(req: Request): Promise<EmailInstance[]> {
    return new Promise<EmailInstance[]>((resolve, reject) => {
      userService.retrieveUser(req['authData'].username).then((user: UserInstance) => {
        const user_id = user.dataValues.id;
        const currentPage: number = req.query.page || 1;
        const offset = (currentPage - 1) * 50;
        const limit = 50;

        sequelize.transaction(() => {
          return models.EmailRecipient.findAll({ where: { user_id, recipient_type: "sender" }, order: [['created_at', 'DESC']], offset, limit }).then((emailRecipients: EmailRecipientInstance[]) => {
            const allEmailIds: number[] = [];
            emailRecipients.forEach((email: EmailRecipientInstance) => {
              allEmailIds.push(email.dataValues.email_id);
            });
            sequelize.transaction(() => {
              return models.Email.findAll({
                where: { id: allEmailIds },
                order: [['created_at', 'DESC']],
                attributes: ["id", "to", "subject", "created_at"]
              }).then((emails) => {
                resolve(emails);
              });
            });
          });
        });
      });
    });
  }

  setEmailRecipients(email_id: number, req: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      userService.retrieveUser(req['authData'].username).then((user) => {
        let emailRecipients: EmailRecipientAttributes[] = [{
          user_id: user.dataValues.id,
          email_id: email_id,
          recipient_type: 'sender'
        }];
        for (const item of req['users_data']['to']) {
          emailRecipients.push({
            user_id: item.user_id,
            email_id: email_id,
            recipient_type: 'to'
          });
        }

        if (!!req['users_data']['cc']) {
          for (const item of req['users_data']['cc']) {
            emailRecipients.push({
              user_id: item.user_id,
              email_id: email_id,
              recipient_type: 'cc'
            });
          }
        }

        if (!!req['users_data']['bcc']) {
          for (const item of req['users_data']['bcc']) {
            emailRecipients.push({
              user_id: item.user_id,
              email_id: email_id,
              recipient_type: 'bcc'
            });
          }
        }

        sequelize.transaction(() => {
          return models.EmailRecipient
            .bulkCreate(emailRecipients)
            .then((data: EmailRecipientInstance[]) => {
              if (data) {
                resolve(true);
              } else {
                resolve(false);
              }
            }).catch((err: Error) => {
              resolve(false);
            });
        });
      });
    });
  }

  checkAllEmails(allEmailsToCheck: AllEmailsToCheck): Promise<AllPresentEmails | null> {
    let allPresentEmails: AllPresentEmails = { to: null, cc: null, bcc: null };
    let promise = new Promise<AllPresentEmails | null>((resolve, reject) => {
      userService.emailsArePresent(allEmailsToCheck.to).then((toEmailsArePresent) => {
        if (toEmailsArePresent) {
          allPresentEmails.to = toEmailsArePresent;
          if (!!allEmailsToCheck.cc) {
            userService.emailsArePresent(allEmailsToCheck.cc).then((ccEmailsArePresent) => {
              if (ccEmailsArePresent) {
                allPresentEmails.cc = ccEmailsArePresent;
                if (!!allEmailsToCheck.bcc) {
                  userService.emailsArePresent(allEmailsToCheck.bcc).then((bccEmailsArePresent) => {
                    if (bccEmailsArePresent) {
                      allPresentEmails.bcc = bccEmailsArePresent;
                      resolve(allPresentEmails);
                    } else {
                      resolve(null);
                    }
                  });
                } else {
                  resolve(allPresentEmails);
                }
              } else {
                resolve(null);
              }
            });
          } else if (!!allEmailsToCheck.bcc) {
            userService.emailsArePresent(allEmailsToCheck.bcc).then((bccEmailsArePresent) => {
              if (bccEmailsArePresent) {
                allPresentEmails.bcc = bccEmailsArePresent;
                resolve(allPresentEmails);
              } else {
                resolve(null);
              }
            });
          } else {
            resolve(allPresentEmails);
          }
        } else {
          resolve(null);
        }
      });
    });
    return promise;
  }

  deleteEmailsThroughIds(req: Request, email_ids: number[], page_type: string): Promise<boolean | number> {
    return new Promise<boolean | number>((resolve, reject) => {
      userService.retrieveUser(req['authData'].username).then((user: UserInstance) => {
        const user_id = user.dataValues.id;
        sequelize.transaction(() => {
          let recipient_type = page_type === 'inbox' ? { [Op.or]: ['to', 'cc', 'bcc'] } : 'sender';
          return models.EmailRecipient
            .destroy({
              where: {
                user_id,
                email_id: email_ids,
                recipient_type: recipient_type
              }
            }).then((data) => {
              resolve(!!data && data);
            });
        });
      });
    });
  }

  getEmailFromEmailId(req: Request, email_id: number): Promise<EmailInstance | null> {
    return new Promise<EmailInstance | null>((resolve, reject) => {
      userService.retrieveUser(req['authData'].username).then((user: UserInstance) => {
        const user_id = user.dataValues.id;
        const page_type: string = req.query.type || 'inbox';
        if (page_type === 'inbox') {
          models.EmailRecipient.findOne({ where: { email_id, user_id, recipient_type: { [Op.or]: ['to', 'cc', 'bcc'] } } }).then((recepient) => {
            const recep_type = recepient && recepient.dataValues.recipient_type;
            if (recep_type) {
              return models.Email
                .findOne({ where: { id: email_id } }).then((email) => {
                  if (email) {
                    if (recep_type === 'to') {
                      resolve(email);
                    } else if (recep_type === 'cc' || recep_type === 'bcc') {
                      delete email.dataValues.bcc;
                      if (recep_type === 'bcc') {
                        email.dataValues.bcc = user.dataValues.email;
                      }
                      resolve(email);
                    }
                  }
                  resolve(email);
                });
            } else {
              resolve(null);
            }
          });
        } else if (page_type === 'sent') {
          models.EmailRecipient.findOne({ where: { email_id, user_id, recipient_type: 'sender' } }).then((recepient) => {
            const recep_type = recepient && recepient.dataValues.recipient_type;
            if (recep_type) {
              return models.Email
                .findOne({ where: { id: email_id } }).then((email) => {
                  resolve(email);
                });
            }
            resolve(null);
          });
        } else {
          resolve(null);
        }
      });
    });
  }
}

export const emailService = new EmailService();