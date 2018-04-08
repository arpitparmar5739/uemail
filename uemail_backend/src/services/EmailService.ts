import { models, sequelize } from '../models/index';
import { EmailAttributes, EmailInstance } from '../models/interfaces/EmailInterface';
import { Transaction } from 'sequelize';
import { userService } from './UserService';

export class EmailService {
  createEmail(emailAttributes: EmailAttributes): Promise<EmailInstance> {
    let promise = new Promise<EmailInstance>((resolve, reject) => {
      sequelize.transaction(() => {
        return models.Email
          .create(emailAttributes)
          .then((emailInstance: EmailInstance) => {
            resolve(emailInstance);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
    return promise;
  }

  checkAllEmails(allEmailsToCheck: string[]): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, reject) => {
      userService.emailsArePresent(allEmailsToCheck).then((emailsArePresent) => {
        console.log(emailsArePresent);
        resolve(emailsArePresent);
      });
    });
    return promise;
  }
}

export const emailService = new EmailService();