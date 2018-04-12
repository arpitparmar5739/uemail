"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = require("../services/EmailService");
function checkEmail(req, email, senderType) {
    if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(email)) {
        req.check(senderType, `${email} is not a valid email address!`)
            .not().equals(req.body[senderType]);
    }
}
function setUsersData(req, data, field) {
    for (const item of data) {
        if (!!item.user_id) {
            req['users_data'][field] = data;
        }
        else {
            req.check(field, `${item.email_id} not found!`)
                .not().equals(req.body[field]);
        }
    }
}
function validateEmail(req) {
    return new Promise((resolve) => {
        req.check('to', 'Field "To" is required!').trim().not().isEmpty();
        if (!req.validationErrors()) {
            if (!req.body.subject && !req.body.body && !req.body.any_attachment) {
                req.check('to', 'Can not send empty email!')
                    .not().equals(req.body.to);
            }
            let allEmailsToCheck = {
                to: req.body.to.replace(/\s/g, '').split(","),
                cc: !!req.body.cc ? req.body.cc.replace(/\s/g, '').split(",") : undefined,
                bcc: !!req.body.bcc ? req.body.bcc.replace(/\s/g, '').split(",") : undefined
            };
            allEmailsToCheck.to.forEach(email => {
                checkEmail(req, email, "to");
            });
            if (!!allEmailsToCheck.cc) {
                allEmailsToCheck.cc.forEach(email => {
                    checkEmail(req, email, "cc");
                });
            }
            if (!!allEmailsToCheck.bcc) {
                allEmailsToCheck.bcc.forEach(email => {
                    checkEmail(req, email, "bcc");
                });
            }
            if (!req.validationErrors()) {
                EmailService_1.emailService.checkAllEmails(allEmailsToCheck).then((data) => {
                    if (data && !!data.to) {
                        req['users_data'] = {};
                        setUsersData(req, data.to, "to");
                        if (!!data.cc) {
                            setUsersData(req, data.cc, "cc");
                        }
                        if (!!data.bcc) {
                            setUsersData(req, data.bcc, "bcc");
                        }
                    }
                    else {
                        req.check('to', `Email Validation Failed!`)
                            .not().equals(req.body.to);
                    }
                    resolve(!req.validationErrors());
                });
            }
            else {
                resolve(!req.validationErrors());
            }
        }
        else {
            resolve(!req.validationErrors());
        }
    });
}
exports.validateEmail = validateEmail;
