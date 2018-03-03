"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
class UserService {
    createUser(userAttributes) {
        let promise = new Promise((resolve, reject) => {
            index_1.sequelize.transaction((t) => {
                return index_1.models.User.create(userAttributes).then((userInstance) => {
                    resolve(userInstance);
                }).catch((error) => {
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
    retrieveUser(username, password) {
        let promise = new Promise((resolve, reject) => {
            index_1.sequelize.transaction((t) => {
                //TODO: Add type in the user argument in .then((user))
                return index_1.models.User.findOne({
                    where: { username: username, password: password }
                }).then((user) => {
                    resolve(user);
                }).catch((error) => {
                    reject(error);
                });
            });
        });
        return promise;
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
