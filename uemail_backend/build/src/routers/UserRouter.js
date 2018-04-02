"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const jwt = require("jsonwebtoken");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this._routes();
    }
    getUser(req, res) {
        jwt.verify(req['token'], 'my-secret-token-to-change-in-production', (err, authData) => {
            if (err) {
                res.sendStatus(401);
            }
            else {
                let username = authData.username;
                UserService_1.userService.retrieveUser(username).then((user) => {
                    if (!!user) {
                        return res.json({
                            "username": user.dataValues.username,
                            "email": user.dataValues.email,
                            "firstname": user.dataValues.firstname,
                            "lastname": user.dataValues.lastname,
                            "phone": user.dataValues.phone
                        });
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
        });
    }
    getUsers(req, res) {
        jwt.verify(req['token'], 'my-secret-token-to-change-in-production', (err, authData) => {
            if (err) {
                res.sendStatus(401);
            }
            else {
                UserService_1.userService.retrieveUsers().then((users) => {
                    return res.json(users);
                }).catch((error) => {
                    return res.json(error);
                });
            }
        });
    }
    _routes() {
        this.router.get("/", [verifyToken_1.default], this.getUsers);
        this.router.get("/:username", [verifyToken_1.default], this.getUser);
    }
}
exports.userRouter = new UserRouter().router;
