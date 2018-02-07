"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const express_1 = require("express");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this._routes();
    }
    createUser(req, res) {
        UserService_1.userService.createUser(req.body).then((user) => {
            return res.json(user);
        }).catch((error) => {
            return res.json(error);
        });
    }
    getUsers(req, res) {
        UserService_1.userService.retrieveUsers().then((users) => {
            return res.json(users);
        }).catch((error) => {
            return res.json(error);
        });
    }
    _routes() {
        this.router.get("/", this.getUsers);
        this.router.post("/", this.createUser);
    }
}
exports.userRouter = new UserRouter().router;
