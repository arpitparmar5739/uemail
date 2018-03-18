import {models, sequelize} from '../models/index';
import {UserAttributes, UserInstance} from '../models/interfaces/UserInterface';
import {Transaction} from 'sequelize';

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

  retrieveUser(username: string): Promise<UserInstance> {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.User.findOne({
          where: {username: username}
        }).then((user: UserInstance | null) => {
          resolve(user);
        }).catch((error: Error) => {
          reject(error);
        });
      });
    });
  }

  userIsPresent(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve: Function) => {
      models.User.count({where: {username: username}})
        .then((userCount) => {
          resolve(userCount > 0);
        })
        .catch(() => {
          resolve(true);
        });
    });
  }

  emailIsPresent(email: string): Promise<boolean> {
    return new Promise<boolean>((resolve: Function) => {
      models.User.count({where: {email: email}})
        .then((userCount) => {
          resolve(userCount > 0);
        })
        .catch(() => {
          resolve(true);
        });
    });
  }
}

export const userService = new UserService();
