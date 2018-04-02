"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt = require("jsonwebtoken");
const verifyToken_1 = require("../middleware/verifyToken");
class HomePageRouter {
    constructor() {
        this.router = express_1.Router();
        this._routes();
    }
    _getHomePage(req, res) {
        jwt.verify(req['token'], 'my-secret-token-to-change-in-production', (err, authData) => {
            if (err) {
                res.sendStatus(401);
            }
            else {
                res.status(200).json(authData);
            }
        });
    }
    _routes() {
        this.router.get('/', [verifyToken_1.default], this._getHomePage);
    }
}
exports.homePageRouter = new HomePageRouter().router;
