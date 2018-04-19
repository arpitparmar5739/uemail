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
    retrieveUser(username) {
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
    getUserNamesByEmailIds(emails) {
        return new Promise((resolve, reject) => {
            index_1.sequelize.transaction(() => {
                const allEmailsArr = [...new Set(emails)];
                return index_1.models.User.findAll({ where: { email: allEmailsArr } }).then((users) => {
                    let allEmailsWithUserNames = [];
                    users.forEach((user) => {
                        allEmailsWithUserNames[user.dataValues.email] = user.dataValues.firstname + " " + user.dataValues.lastname;
                    });
                    resolve(allEmailsWithUserNames);
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
                // True because if request fails then user might be present.
                resolve(true);
            });
        });
    }
    emailIsPresent(email) {
        return new Promise((resolve, reject) => {
            index_1.models.User.findOne({ where: { email: email } })
                .then((user) => {
                if (user) {
                    resolve({
                        user_id: user.dataValues.id,
                        email_id: email
                    });
                }
                else {
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
    emailsArePresent(emails) {
        return new Promise((resolve, reject) => {
            let allPromises = [];
            emails.forEach((email) => {
                allPromises.push(this.emailIsPresent(email));
            });
            Promise.all(allPromises).then((values) => {
                resolve(values);
            });
        });
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
