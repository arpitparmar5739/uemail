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
    checkAllEmails(allEmailsToCheck) {
        let promise = new Promise((resolve, reject) => {
            UserService_1.userService.emailsArePresent(allEmailsToCheck).then((emailsArePresent) => {
                console.log(emailsArePresent);
                resolve(emailsArePresent);
            });
        });
        return promise;
    }
}
exports.EmailService = EmailService;
exports.emailService = new EmailService();
