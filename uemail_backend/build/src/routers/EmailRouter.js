"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmailService_1 = require("../services/EmailService");
const verifyToken_1 = require("../middleware/verifyToken");
function validateEmail(req) {
    return new Promise((resolve) => {
        req.check('to', "Invalid 'To' Email").trim().isEmail().isLength({ max: 50 });
        if (!req.body.subject && !req.body.body && !req.body.any_attachment) {
            req.check('to', 'Can not send empty email!')
                .not().equals(req.body.to);
        }
        let allEmailsToCheck = req.body.to.replace(/\s/g, '');
        if (!!req.body.cc) {
            allEmailsToCheck += "," + req.body.cc.replace(/\s/g, '');
        }
        if (!!req.body.bcc) {
            allEmailsToCheck += "," + req.body.bcc.replace(/\s/g, '');
        }
        EmailService_1.emailService.checkAllEmails(allEmailsToCheck.split(",")).then((data) => {
            if (data !== true) {
                req.check('to', `Email ${data[1]} not found!`)
                    .not().equals(req.body.to);
            }
            resolve(!req.validationErrors());
        });
    });
}
class EmailRouter {
    constructor() {
        this.router = express_1.Router();
        this._routes();
    }
    sendEmail(req, res) {
        validateEmail(req).then((validation) => {
            if (validation) {
                req.body['sent_by'] = req['authData'].email;
                if (!req.body.any_attachment) {
                    req.body.any_attachment = false;
                }
                res.json(req.body);
            }
            else {
                let errors = req.validationErrors();
                for (let item in errors) {
                    errors[item] = errors[item].msg;
                }
                res.status(422).json({ "Error": errors[0] });
            }
        });
    }
    _routes() {
        this.router.post('/send', [verifyToken_1.default], this.sendEmail);
    }
}
exports.emailRouter = new EmailRouter().router;
