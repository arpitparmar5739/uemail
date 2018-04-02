"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function verifyToken(req, res, next) {
    const bearerToken = req.headers['authorization'];
    if (typeof bearerToken !== 'undefined') {
        req["token"] = bearerToken;
        next();
    }
    else {
        res.sendStatus(401);
    }
}
exports.default = verifyToken;
