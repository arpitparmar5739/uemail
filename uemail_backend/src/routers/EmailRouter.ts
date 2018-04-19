import { Request, Response, Router } from "express";
import { emailService } from '../services/EmailService';
import { EmailInstance } from "../models/interfaces/EmailInterface";

import verifyToken from "../middleware/verifyToken";
import { validateEmail } from "../utils/EmailValidation";
import { EmailRecipientInstance } from "../models/interfaces/EmailRecipientInterface";
import { userService } from "../services/UserService";

class EmailRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._routes();
  }

  public sendEmail(req: Request, res: Response): void {
    validateEmail(req).then((validation: boolean) => {
      if (validation) {
        req.body['sent_by'] = req['authData'].firstname + " " + req['authData'].lastname + " <" + req['authData'].email + ">";
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
        res.status(422).json({ status: "422", message: errors });
      }
    });
  }

  public getEmails(req: Request, res: Response): void {
    const page_type: string = req.query.type;

    if (!page_type || page_type === 'inbox') {
      emailService.getInboxEmails(req).then((emails) => {
        res.status(200).json(emails);
      }).catch((err: Error) => {
        res.status(500).json({ "status": "error", "message": "Something went wrong!" });
      });
    } else if (page_type === 'sent') {
      emailService.getSentEmails(req).then((emails) => {
        res.status(200).json(emails);
      });
    } else {
      res.status(404);
    }

  }

  public deleteEmails(req: Request, res: Response): void {
    const allEmailIds: number[] = req.body.email_ids || [];
    const page_type: string = req.body.page_type || 'inbox';

    for (let email_id of allEmailIds) {
      if (typeof email_id !== 'number') {
        res.status(422).json("Invalid Input!");
      }
    }

    emailService.deleteEmailsThroughIds(req, allEmailIds, page_type).then((data) => {
      res.status(200).json(data);
    });
  }

  public totalEmails(req: Request, res: Response) {
    emailService.getTotalEmails(req).then((count) => {
      res.status(200).json({ "totalEmails": count });
    });
  }

  public getEmail(req: Request, res: Response): void {
    const email_id: number = req.query.email_id;
    if (!!email_id) {
      emailService.getEmailFromEmailId(req, email_id).then(email => {
        res.status(200).json(email);
        // res.status(200).json({
        //   "id":237,
        //   "to":"arpitparmar5739@gmail.com,arpitparmarsfsfdfsdfddf5739@gmail.com,arpitparmar5739@gmail.com,arpitparmar5739@gmail.com,arpitparmar5739@gmail.com,arpitparmar5739@gmail.com,arpitparmar5739@gmail.com",
        //   "cc":"",
        //   "bcc":"tusharrathore1912@gmail.com,tusharrathore1912@gmail.com,tusharrathore1912@gmail.com,tusharrathore1912@gmail.com,tusharrathore1912@gmail.com",
        //   "subject":"Fwd: Campus/Walk-in Proposal for Shri Vaishnav Institute of Technology and Science (SVITS), Indore",
        //   "body":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        //   "sent_by":"Arpit Parmar <arpitparmar5739@gmail.com>",
        //   "any_attachment":false,
        //   "email_type":"primary",
        //   "created_at":"2018-04-17T09:11:59.000Z",
        //   "updated_at":"2018-04-17T09:11:59.000Z"
        // });
      });
    } else {
      res.status(422).json({ error: "Invalid Input!" });
    }
  }

  private _routes() {
    this.router.post('/send', [verifyToken], this.sendEmail);
    this.router.post('/delete', [verifyToken], this.deleteEmails);
    this.router.get('/get_emails', [verifyToken], this.getEmails);
    this.router.get('/get_email', [verifyToken], this.getEmail);
    this.router.get('/totalEmails', [verifyToken], this.totalEmails);
  }
}

export const emailRouter = new EmailRouter().router;