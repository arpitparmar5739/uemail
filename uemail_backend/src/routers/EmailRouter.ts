import { Request, Response, Router } from "express";
import { emailService } from '../services/EmailService';
import verifyToken from "../middleware/verifyToken";

function validateEmail(req: Request): Promise<boolean> {
  return new Promise<boolean>((resolve: Function) => {
    req.check('to', "Invalid 'To' Email").trim().isEmail().isLength({ max: 50 });

    if (!req.body.subject && !req.body.body && !req.body.any_attachment) {
      req.check('to', 'Can not send empty email!')
        .not().equals(req.body.to);
    }

    let allEmailsToCheck: string = req.body.to.replace(/\s/g, '');
    if (!!req.body.cc) {
      allEmailsToCheck += "," + req.body.cc.replace(/\s/g, '');
    }
    if (!!req.body.bcc) {
      allEmailsToCheck += "," + req.body.bcc.replace(/\s/g, '');
    }
    emailService.checkAllEmails(allEmailsToCheck.split(",")).then((data) => {
      if (data !== true) {
        req.check('to', `Email ${data[1]} not found!`)
          .not().equals(req.body.to);
      }
      resolve(!req.validationErrors());
    });
  });
}

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
        res.json(req.body);
      } else {
        let errors = req.validationErrors();
        for (let item in errors) {
          errors[item] = errors[item].msg;
        }
        res.status(422).json({"Error": errors[0]});
      }
    });
  }

  private _routes() {
    this.router.post('/send', [verifyToken], this.sendEmail);
  }
}

export const emailRouter = new EmailRouter().router;