import { Request, Response, Router } from "express";
import { emailService } from '../services/EmailService';
import { EmailInstance } from "../models/interfaces/EmailInterface";

import verifyToken from "../middleware/verifyToken";
import { validateEmail } from "../utils/EmailValidation";

class EmailRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._routes();
  }

  public sendEmail(req: Request, res: Response): void {
    validateEmail(req).then((validation: boolean) => {
      if (validation) {
        req.body['sent_by'] = req['authData'].email;
        if (!req.body.any_attachment) {
          req.body.any_attachment = false;
        }
        emailService.createEmail(req.body)
          .then((email: EmailInstance) => {
            if (!!email) {
              let email_id = email.dataValues.id;
              emailService.setEmailRecipients(email_id, req).then((email_sent) => {
                if (email_sent) {
                  const message: string = "Email sent successfully!";
                  return res.json({
                    "status": 200,
                    "message": message
                  });
                } else {
                  const message: string = "Email is uploaded but could not be sent to all recipients!";
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
      } else {
        let errors = req.validationErrors();
        for (const item in errors) {
          errors[item] = errors[item].msg;
        }
        res.status(422).json({ "Errors": errors });
      }
    });
  }

  private _routes() {
    this.router.post('/send', [verifyToken], this.sendEmail);
  }
}

export const emailRouter = new EmailRouter().router;