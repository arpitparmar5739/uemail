"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmailService_1 = require("../services/EmailService");
const verifyToken_1 = require("../middleware/verifyToken");
const EmailValidation_1 = require("../utils/EmailValidation");
class EmailRouter {
    constructor() {
        this.router = express_1.Router();
        this._routes();
    }
    sendEmail(req, res) {
        EmailValidation_1.validateEmail(req).then((validation) => {
            if (validation) {
                req.body['sent_by'] = req['authData'].email;
                if (!req.body.any_attachment) {
                    req.body.any_attachment = false;
                }
                EmailService_1.emailService.createEmail(req.body)
                    .then((email) => {
                    if (!!email) {
                        let email_id = email.dataValues.id;
                        EmailService_1.emailService.setEmailRecipients(email_id, req).then((email_sent) => {
                            if (email_sent) {
                                const message = "Email sent successfully!";
                                return res.json({
                                    "status": 200,
                                    "message": message
                                });
                            }
                            else {
                                const message = "Email is uploaded but could not be sent to all recipients!";
                                return res.json({
                                    "status": 400,
                                    "message": message
                                });
                            }
                        });
                    }
                })
                    .catch((error) => {
                    return res.status(422).send({
                        "status": 422,
                        "message": error.message
                    });
                });
            }
            else {
                let errors = req.validationErrors();
                res.status(422).json({ status: "422", message: errors });
            }
        });
    }
    _routes() {
        this.router.post('/send', [verifyToken_1.default], this.sendEmail);
    }
}
exports.emailRouter = new EmailRouter().router;
