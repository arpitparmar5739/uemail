"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
//import routers
const LoginRouter_1 = require("./routers/LoginRouter");
const SignupRouter_1 = require("./routers/SignupRouter");
const UserRouter_1 = require("./routers/UserRouter");
const HomePageRouter_1 = require("./routers/HomePageRouter");
const EmailRouter_1 = require("./routers/EmailRouter");
class Server {
    constructor() {
        this._app = express();
        this._app.use(bodyParser.json());
        this._app.use(expressValidator({
            customValidators: {
                arpitCustomFunction: function (value) {
                    return false;
                }
            }
        }));
        this._app.use(morgan("dev"));
        this._app.use((error, req, res, next) => {
            if (error) {
                res.status(400).send(error);
            }
        });
        //Access control allow origin
        this._app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
        //setup routes
        this._routes();
        this._server = http.createServer(this._app);
    }
    start(port) {
        this._server.listen(port);
        this._server.on("error", error => this._onError(error));
        this._server.on("listening", () => this._onListening());
    }
    _routes() {
        //Routes Setup
        //Server Check
        this._app.use("/", express.Router().get('/', (req, res) => {
            res.json("Uemail server has started successfully");
        }));
        this._app.use('/users', UserRouter_1.userRouter);
        this._app.use('/login', LoginRouter_1.loginRouter);
        this._app.use('/signup', SignupRouter_1.signupRouter);
        this._app.use('/home', HomePageRouter_1.homePageRouter);
        this._app.use('/email', EmailRouter_1.emailRouter);
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
}
exports.default = new Server();
