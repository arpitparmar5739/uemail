"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const UserService_1 = require("./UserService");
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
    setEmailRecipients(email_id, req) {
        let emailRecipients = [{
                user_id: req['users_data']['to'].user_id,
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
            UserService_1.userService.emailsArePresent([allEmailsToCheck.to]).then((toEmailIsPresent) => {
                if (!toEmailIsPresent[0].error) {
                    allPresentEmails.to = toEmailIsPresent[0];
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
}
exports.EmailService = EmailService;
exports.emailService = new EmailService();
