"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
class UserService {
    createUser(userAttributes) {
        let promise = new Promise((resolve, reject) => {
            index_1.sequelize.transaction(() => {
                return index_1.models.User
                    .create(userAttributes)
                    .then((userInstance) => {
                    resolve(userInstance);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        });
        return promise;
    }
    retrieveUsers() {
        let promise = new Promise((resolve, reject) => {
            index_1.sequelize.transaction((t) => {
                return index_1.models.User.findAll().then((users) => {
                    resolve(users);
                }).catch((error) => {
                    reject(error);
                });
            });
        });
        return promise;
    }
    retrieveUser(username, password = '') {
        return new Promise((resolve, reject) => {
            index_1.sequelize.transaction((t) => {
                return index_1.models.User.findOne({
                    where: { username: username }
                }).then((user) => {
                    resolve(user);
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    }
    userIsPresent(username) {
        return new Promise((resolve) => {
            index_1.models.User.count({ where: { username: username } })
                .then((userCount) => {
                resolve(userCount > 0);
            })
                .catch(() => {
                resolve(true);
            });
        });
    }
    emailIsPresent(email) {
        return new Promise((resolve) => {
            index_1.models.User.count({ where: { email: email } })
                .then((userCount) => {
                resolve(userCount > 0);
            })
                .catch(() => {
                resolve(true);
            });
        });
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
