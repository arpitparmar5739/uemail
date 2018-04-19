import { Request } from 'express';
import { emailService } from '../services/EmailService';

function checkEmail(req: Request, email: string, senderType: string): void {
  if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(email)) {
    req.check(senderType, `${email} is not a valid email address!`)
      .not().equals(req.body[senderType]);
  }
}

function setUsersData(req: Request, data: any, field: string) {
  for (const item of data) {
    if (!!item.user_id) {
      req['users_data'][field] = data;
    } else {
      req.check(field, `${item.email_id} not found!`)
        .not().equals(req.body[field]);
    }
  }
}

function removeDuplicates(allEmailsToCheck): AllEmailsToCheck {
  const to = new Set<string[]>(allEmailsToCheck.to);
  const bcc = allEmailsToCheck.bcc && new Set<string[]>(allEmailsToCheck.bcc);
  const cc = allEmailsToCheck.cc && new Set<string[]>(allEmailsToCheck.cc);

  if (allEmailsToCheck.bcc) {
    allEmailsToCheck.bcc.forEach((bcc_email, index)=> {
      if (to.has(bcc_email)) {
        bcc.delete(bcc_email);
      }
    });
  }

  if (allEmailsToCheck.cc) {
    allEmailsToCheck.cc.forEach((cc_email, index)=> {
      if (to.has(cc_email) || (bcc && bcc.has(cc_email))) {
        cc.delete(cc_email);
      }
    });
  }

  allEmailsToCheck.to = [...to];
  allEmailsToCheck.bcc = bcc && [...bcc];
  allEmailsToCheck.cc = cc && [...cc];

  return allEmailsToCheck;
}

export function validateEmail(req: Request): Promise<boolean> {
  return new Promise<boolean>((resolve: Function) => {
    req.check('to', 'Field "To" is required!').trim().not().isEmpty();

    if (!req.validationErrors()) {
      if (!req.body.subject && !req.body.body && !req.body.any_attachment) {
        req.check('to', 'Can not send empty email!')
          .not().equals(req.body.to);
      }

      let allEmailsToCheck: AllEmailsToCheck = {
        to: req.body.to.replace(/\s/g, '').split(","),
        cc: !!req.body.cc ? req.body.cc.replace(/\s/g, '').split(",") : undefined,
        bcc: !!req.body.bcc ? req.body.bcc.replace(/\s/g, '').split(",") : undefined
      };

      allEmailsToCheck = removeDuplicates(allEmailsToCheck);

      console.log("\n\n");
      console.log(allEmailsToCheck);
      console.log("\n\n");

      allEmailsToCheck.to.forEach(email => {
        checkEmail(req, email, "to");
      });

      if (!!allEmailsToCheck.bcc) {
        allEmailsToCheck.bcc.forEach(email => {
          checkEmail(req, email, "bcc");
        });
      }

      if (!!allEmailsToCheck.cc) {
        allEmailsToCheck.cc.forEach(email => {
          checkEmail(req, email, "cc");
        });
      }

      if (!req.validationErrors()) {
        emailService.checkAllEmails(allEmailsToCheck).then((data: AllPresentEmails | null) => {
          if (data && !!data.to) {
            req['users_data'] = {};
            setUsersData(req, data.to, "to");

            if (!!data.bcc) {
              setUsersData(req, data.bcc, "bcc");
            }

            if (!!data.cc) {
              setUsersData(req, data.cc, "cc");
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