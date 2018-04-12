import { models, sequelize } from '../models/index';
import { EmailAttributes, EmailInstance } from '../models/interfaces/EmailInterface';
import { Transaction } from 'sequelize';
import { userService } from './UserService';
import { Request } from 'express';
import { EmailRecipientAttributes, EmailRecipientInstance } from '../models/interfaces/EmailRecipientInterface';

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

  // deleteEmail(): Promise<boolean> {
  //   return new Promise<boolean>((resolve, reject) => {
  //     sequelize.transaction(() => {
  //       return models.Email.destroy();
  //     });
  //   });
  // }

  setEmailRecipients(email_id: number, req: Request): Promise<boolean> {
    let emailRecipients: EmailRecipientAttributes[] = [{
      user_id: req['users_data']['to']!.user_id,
      email_id: email_id,
      recipient_type: 'to'
    }];

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

    return new Promise<boolean>((resolve, reject) => {
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
}

export const emailService = new EmailService();