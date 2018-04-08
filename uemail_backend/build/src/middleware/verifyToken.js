"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    const bearerToken = req.headers['authorization'];
    if (typeof bearerToken !== 'undefined') {
        req["token"] = bearerToken;
        jwt.verify(req['token'], 'my-secret-token-to-change-in-production', (err, authData) => {
            if (err) {
                res.sendStatus(401);
            }
            else {
                req['authData'] = authData;
                next();
            }
        });
    }
    else {
        res.sendStatus(401);
    }
}
exports.default = verifyToken;
