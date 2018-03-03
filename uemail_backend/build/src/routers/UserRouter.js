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
    getUser(req, res) {
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
        this.router.post("/:username", this.getUser);
    }
}
exports.userRouter = new UserRouter().router;
