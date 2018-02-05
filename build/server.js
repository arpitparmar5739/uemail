"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
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
        //Just for checking the server
        this._app.use("/", express.Router().get('/', (req, res, next) => {
            res.json("Hello World uemail server has started!");
        }));
    }
    _onError(error) {
        console.log(error);
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
