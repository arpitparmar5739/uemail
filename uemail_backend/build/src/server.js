"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
//import routers
const LoginRouter_1 = require("./routers/LoginRouter");
const SignupRouter_1 = require("./routers/SignupRouter");
class Server {
    constructor() {
        this._app = express();
        this._app.use(bodyParser.json());
        this._app.use(morgan("dev"));
        this._app.use((error, req, res, next) => {
            if (error) {
                res.status(400).send(error);
            }
        });
        //setup routes
        this._routes();
        this._server = http.createServer(this._app);
    }
    _routes() {
        //Routes Setup
        //Server Check
        this._app.use("/", express.Router().get('/', (req, res) => {
            res.json("Uemail server has started successfully");
        }));
        //User Rotuer
        this._app.use('/login', LoginRouter_1.loginRouter);
        this._app.use('/signup', SignupRouter_1.signupRouter);
    }
    _onError(error) {
        console.log(error);
        throw error;
    }
    _onListening() {
        let address = this._server.address();
        let bind = `port ${address.port}`;
        console.log(`Listening on ${bind}.`);
    }
    ;
    start(port) {
        this._server.listen(port);
        this._server.on("error", error => this._onError(error));
        this._server.on("listening", () => this._onListening());
    }
}
exports.default = new Server();
