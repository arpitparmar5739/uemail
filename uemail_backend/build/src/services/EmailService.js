"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const UserService_1 = require("./UserService");
const Op = index_1.sequelize.Op;
class EmailService {
    createEmail(emailAttributes) {
        let promise = new Promise((resolve, reject) => {
            index_1.sequelize.transaction(() => {
                return index_1.models.Email
                    .create(emailAttributes)
                    .then((emailInstance) => {
                    resolve(emailInstance);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        });
        return promise;
    }
    getInboxEmails(req, getCountOnly = false) {
        return new Promise((resolve, reject) => {
            UserService_1.userService.retrieveUser(req['authData'].username).then((user) => {
                const user_id = user.dataValues.id;
                const currentPage = req.query.page || 1;
                const offset = (currentPage - 1) * 50;
                const limit = 50;
                index_1.sequelize.transaction(() => {
                    return index_1.models.EmailRecipient.findAll({ where: { user_id }, order: [['created_at', 'DESC']], offset, limit }).then((emailRecipients) => {
                        const allEmailIds = [];
                        emailRecipients.forEach((email) => {
                            allEmailIds.push(email.dataValues.email_id);
                        });
                        index_1.sequelize.transaction(() => {
                            return index_1.models.Email.findAll({
                                where: { id: allEmailIds },
                                order: [['created_at', 'DESC']],
                                attributes: ["id", "sent_by", "subject", "created_at"]
                            })
                                .then((emails) => {
                                let allSentByEmails = [];
                                emails.forEach((email) => {
                                    allSentByEmails.push(email.dataValues.sent_by);
                                });
                                UserService_1.userService.getUserNamesByEmailIds(allSentByEmails).then((userNames) => {
                                    emails.forEach((email) => {
                                        email.dataValues.sent_by = userNames[email.dataValues.sent_by];
                                    });
                                    resolve(emails);
                                });
                            }).catch((err) => {
                                reject(err);
                            });
                        });
                    }).catch((err) => {
                        reject(err);
                    });
                });
            });
        });
    }
    getTotalInboxEmails(req) {
        return new Promise((resolve, reject) => {
            UserService_1.userService.retrieveUser(req['authData'].username).then((user) => {
                const user_id = user.dataValues.id;
                index_1.sequelize.transaction(() => {
                    return index_1.models.EmailRecipient.count({ where: { user_id } }).then((count) => {
                        resolve(count);
                    }, (err) => { reject(err); });
                });
            });
        });
    }
    setEmailRecipients(email_id, req) {
        let emailRecipients = [];
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
        return new Promise((resolve, reject) => {
            index_1.sequelize.transaction(() => {
                return index_1.models.EmailRecipient
                    .bulkCreate(emailRecipients)
                    .then((data) => {
                    if (data) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }).catch((err) => {
                    resolve(false);
                });
            });
        });
    }
    checkAllEmails(allEmailsToCheck) {
        let allPresentEmails = { to: null, cc: null, bcc: null };
        let promise = new Promise((resolve, reject) => {
            UserService_1.userService.emailsArePresent(allEmailsToCheck.to).then((toEmailsArePresent) => {
                if (toEmailsArePresent) {
                    allPresentEmails.to = toEmailsArePresent;
                    if (!!allEmailsToCheck.cc) {
                        UserService_1.userService.emailsArePresent(allEmailsToCheck.cc).then((ccEmailsArePresent) => {
                            if (ccEmailsArePresent) {
                                allPresentEmails.cc = ccEmailsArePresent;
                                if (!!allEmailsToCheck.bcc) {
                                    UserService_1.userService.emailsArePresent(allEmailsToCheck.bcc).then((bccEmailsArePresent) => {
                                        if (bccEmailsArePresent) {
                                            allPresentEmails.bcc = bccEmailsArePresent;
                                            resolve(allPresentEmails);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    });
                                }
                                else {
                                    resolve(allPresentEmails);
                                }
                            }
                            else {
                                resolve(null);
                            }
                        });
                    }
                    else if (!!allEmailsToCheck.bcc) {
                        UserService_1.userService.emailsArePresent(allEmailsToCheck.bcc).then((bccEmailsArePresent) => {
                            if (bccEmailsArePresent) {
                                allPresentEmails.bcc = bccEmailsArePresent;
                                resolve(allPresentEmails);
                            }
                            else {
                                resolve(null);
                            }
                        });
                    }
                    else {
                        resolve(allPresentEmails);
                    }
                }
                else {
                    resolve(null);
                }
            });
        });
        return promise;
    }
    deleteEmailsThroughIds(req, email_ids) {
        return new Promise((resolve, reject) => {
            UserService_1.userService.retrieveUser(req['authData'].username).then((user) => {
                const user_id = user.dataValues.id;
                index_1.sequelize.transaction(() => {
                    return index_1.models.EmailRecipient
                        .destroy({
                        where: {
                            user_id,
                            email_id: email_ids,
                            recipient_type: {
                                [Op.or]: ['to', 'cc', 'bcc']
                            }
                        }
                    }).then((data) => {
                        resolve(!!data && data);
                    });
                });
            });
        });
    }
    getEmailFromEmailId(req, email_id) {
        return new Promise((resolve, reject) => {
            UserService_1.userService.retrieveUser(req['authData'].username).then((user) => {
                const user_id = user.dataValues.id;
                const page_type = req.body.page_type || 'inbox';
                if (page_type === 'inbox') {
                    index_1.models.EmailRecipient.findOne({ where: { email_id, user_id } }).then((recepient) => {
                        const recep_type = recepient && recepient.dataValues.recipient_type;
                        if (recep_type) {
                            if (recep_type === 'to') {
                                return index_1.models.Email
                                    .findOne({ where: { id: email_id } }).then((email) => {
                                    resolve(email);
                                });
                            }
                            else if (recep_type === 'cc' || recep_type === 'bcc') {
                                return index_1.models.Email
                                    .findOne({ where: { id: email_id } }).then((email) => {
                                    if (email) {
                                        delete email.dataValues.bcc;
                                        if (recep_type === 'bcc') {
                                            email.dataValues.bcc = user.dataValues.email;
                                        }
                                    }
                                    resolve(email);
                                });
                            }
                            else {
                                resolve(null);
                            }
                        }
                    });
                }
            });
        });
    }
}
exports.EmailService = EmailService;
exports.emailService = new EmailService();
