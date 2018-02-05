"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Welcome {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', (req, res) => {
            res.json("Hello Welcome to Uemail!");
        });
    }
}
//export
exports.default = new Welcome().router;
