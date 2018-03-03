import { models, sequelize } from '../models/index';
import { UserAttributes, UserInstance } from '../models/interfaces/UserInterface';
import { Transaction, Model } from 'sequelize';

export class UserService {
    createUser(userAttributes: UserAttributes): Promise<UserInstance> {
        let promise = new Promise<UserInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.User.create(userAttributes).then((userInstance: UserInstance) => {
                    resolve(userInstance);
                }).catch((error: Error) => {
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

    retrieveUser(username: string, password: string): Promise<UserInstance> {
        let promise = new Promise<UserInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                //TODO: Add type in the user argument in .then((user))
                return models.User.findOne({
                    where: { username: username, password: password }
                }).then((user: UserInstance | null) => {
                    resolve(user);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });

        return promise;
    }
}

export const userService = new UserService();