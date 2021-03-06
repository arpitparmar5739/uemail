import { models, sequelize } from '../models/index';
import { UserAttributes, UserInstance } from '../models/interfaces/UserInterface';
import { Transaction } from 'sequelize';

export class UserService {
  createUser(userAttributes: UserAttributes): Promise<UserInstance> {
    let promise = new Promise<UserInstance>((resolve: Function, reject: Function) => {
      sequelize.transaction(() => {
        return models.User
          .create(userAttributes)
          .then((userInstance: UserInstance) => {
            resolve(userInstance);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });

    return promise;
  }

  retrieveUser(username: string): Promise<UserInstance> {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.User.findOne({
          where: { username: username }
        }).then((user: UserInstance | null) => {
          resolve(user);
        }).catch((error: Error) => {
          reject(error);
        });
      });
    });
  }

  retrieveUsers(): Promise<Array<UserInstance>> {
    let promise = new Promise<Array<UserInstance>>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.User.findAll().then((users: Array<UserInstance>) => {
          resolve(users);
        }).catch((error: Error) => {
          reject(error);
        });
      });
    });
    return promise;
  }

  getUserNamesByEmailIds(emails: string[]): Promise<{[email: string]: string}[]> {
    return new Promise<{[email: string]: string}[]>((resolve, reject) => {
      sequelize.transaction(() => {
        const allEmailsArr: string[] = [...new Set(emails)];
        return models.User.findAll({where: {email: allEmailsArr}}).then((users: Array<UserInstance>) => {
          let allEmailsWithUserNames: {[email: string]: string}[] = [];
          users.forEach((user) => {
            allEmailsWithUserNames[user.dataValues.email] = user.dataValues.firstname + " " + user.dataValues.lastname;
          });
          resolve(allEmailsWithUserNames);
        }).catch((error: Error) => {
          reject(error);
        });
      });
    });
  }

  userIsPresent(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve: Function) => {
      models.User.count({ where: { username: username } })
        .then((userCount) => {
          resolve(userCount > 0);
        })
        .catch(() => {
          // True because if request fails then user might be present.
          resolve(true);
        });
    });
  }

  emailIsPresent(email: string): Promise<EmailIsPresentObject> {
    return new Promise<EmailIsPresentObject>((resolve: Function, reject: Function) => {
      models.User.findOne({ where: { email: email } })
        .then((user: UserInstance | null) => {
          if (user) {
            resolve({
              user_id: user.dataValues.id,
              email_id: email
            });
          } else {
            resolve({
              email_id: email,
              error: "Not Found"
            });
          }
        })
        .catch(() => {
          reject("Something bad happened while checking if email is present.");
        });
    });
  }

  emailsArePresent(emails: string[]): Promise<(EmailIsPresentObject)[]> {
    return new Promise<(EmailIsPresentObject)[]>((resolve: Function, reject: Function) => {
      let allPromises: Promise<EmailIsPresentObject>[] = [];
      emails.forEach((email) => {
        allPromises.push(this.emailIsPresent(email));
      });

      Promise.all(allPromises).then((values: (EmailIsPresentObject)[]) => {
        resolve(values);
      });
    });
  }
}

export const userService = new UserService();
