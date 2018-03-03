"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const express_1 = require("express");
class SignupRouter {
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
    _routes() {
        this.router.post("/", this.createUser);
    }
}
exports.signupRouter = new SignupRouter().router;
