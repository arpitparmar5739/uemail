"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const express_1 = require("express");
const bcrypt = require("bcrypt");
class LoginRouter {
    constructor() {
        this.router = express_1.Router();
        this._routes();
    }
    loginUser(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        UserService_1.userService.retrieveUser(username).then((user) => {
            if (!!user) {
                if (bcrypt.compareSync(password, user.dataValues.password)) {
                    return res.status(200).json({
                        "status": 200,
                        "message": {
                            "username": user.dataValues.username,
                            "firstname": user.dataValues.firstname,
                            "lastname": user.dataValues.lastname
                        }
                    });
                }
                return res.status(422).json({
                    "status": 422,
                    "message": "Invalid password!"
                });
            }
            return res.status(422).json({
                "status": 422,
                "message": "Invalid Username!"
            });
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
