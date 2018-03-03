"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const express_1 = require("express");
class LoginRouter {
    constructor() {
        this.router = express_1.Router();
        this._routes();
    }
    loginUser(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        UserService_1.userService.retrieveUser(username, password).then((user) => {
            if (!!user) {
                return res.json(user);
            }
            else {
                return res.json({ "message": "Invalid username/password!" });
            }
        }).catch((error) => {
            return res.json({
                "Error": error
            });
        });
    }
    _routes() {
        this.router.post("/", this.loginUser);
    }
}
exports.loginRouter = new LoginRouter().router;
