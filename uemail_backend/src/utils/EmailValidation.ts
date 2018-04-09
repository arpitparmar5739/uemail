import { Request } from 'express';
import { emailService } from '../services/EmailService';

export function validateEmail(req: Request): Promise<boolean> {
  return new Promise<boolean>((resolve: Function) => {
    req.check('to', `${req.body.to} is not a valid email address!`).trim().isEmail().isLength({ max: 50 });
    
    if (!req.validationErrors()) {
      if (!req.body.subject && !req.body.body && !req.body.any_attachment) {
        req.check('to', 'Can not send empty email!')
          .not().equals(req.body.to);
      }
  
      let allEmailsToCheck: AllEmailsToCheck = {
        to: req.body.to.replace(/\s/g, ''),
      };
  
      if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(allEmailsToCheck.to)) {
        req.check('to', `${allEmailsToCheck.to} is not a valid email address!`)
          .not().equals(req.body.to);
      }
  
      if (!!req.body.cc) {
        allEmailsToCheck.cc = req.body.cc.replace(/\s/g, '').split(",");
        for (const email of allEmailsToCheck.cc!) {
          if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(email)) {
            req.check('to', `${email} is not a valid email address!`)
              .not().equals(req.body.to);
          }   
        }
      }
  
      if (!!req.body.bcc) {
        allEmailsToCheck.bcc = req.body.bcc.replace(/\s/g, '').split(",");
        for (const email of allEmailsToCheck.bcc!) {
          if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(email)) {
            req.check('to', `${email} is not a valid email address!`)
              .not().equals(req.body.to);
          }   
        }
      }

      if (!req.validationErrors()) {
        emailService.checkAllEmails(allEmailsToCheck).then((data: AllPresentEmails | null) => {
          if (data) {
            if (!!data.to) {
              if (!!data.to.user_id) {
                req['users_data'] = {};
                req['users_data']['to'] = data.to;
              } else {
                req.check('to', `Email ${!!data.to && data.to.email_id} not found!`)
                  .not().equals(req.body.to);
              }
            }
  
            if (!!data.cc) {
              for (const item of data.cc) {
                if (!!item.user_id) {
                  req['users_data']['cc'] = data.cc;
                } else {
                  req.check('cc', `Email ${item.email_id} not found!`)
                    .not().equals(req.body.cc);
                }
              }
            }
            if (!!data.bcc) {
              for (const item of data.bcc) {
                if (!!item.user_id) {
                  req['users_data']['bcc'] = data.bcc;
                } else {
                  req.check('bcc', `Email ${item.email_id} not found!`)
                    .not().equals(req.body.bcc);
                }
              }
            }
          } else {
            req.check('to', `Email Validation Failed!`)
              .not().equals(req.body.to);
          }
          resolve(!req.validationErrors());
        });
      } else {
        resolve(!req.validationErrors());
      }
    } else {
      resolve(!req.validationErrors());
    }
  });
}