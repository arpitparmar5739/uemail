"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const express_1 = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class LoginRouter {
    constructor() {
        this.router = express_1.Router();
        this._routes();
    }
    loginUser(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        if (!username
            || !(username.length > 4 && username.length < 16)
            || !(/^[a-z0-9]+$/ig.test(username))) {
            res.status(422).json({
                "status": 422,
                "message": "Invalid Username!"
            });
        }
        else if (!password
            || !(password.length > -4 && password.length < 16)) {
            res.status(422).json({
                "status": 422,
                "message": "Invalid Password!"
            });
        }
        else {
            UserService_1.userService.retrieveUser(username).then((user) => {
                if (!!user) {
                    if (bcrypt.compareSync(password, user.dataValues.password)) {
                        let token = jwt.sign({
                            username: user.dataValues.username,
                            email: user.dataValues.email,
                            firstname: user.dataValues.firstname,
                            lastname: user.dataValues.lastname
                        }, 'my-secret-token-to-change-in-production');
                        return res.status(200).json({
                            "status": 200,
                            "message": {
                                "token": token
                            }
                        });
                    }
                    return res.status(422).json({
                        "status": 422,
                        "message": "Invalid Password!"
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
    }
    _routes() {
        this.router.post("/", this.loginUser);
    }
}
exports.loginRouter = new LoginRouter().router;
