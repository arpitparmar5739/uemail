import * as http from "http";
import * as morgan from 'morgan';
import * as express from 'express';
import * as Sequelize from 'sequelize';
import * as bodyParser from 'body-parser';
import { Express, Request, Response } from "express";

class Server {
    private _app: Express;
    private _server: http.Server;

    constructor() {
        this._app = express();
        this._app.use(bodyParser.json());
        this._app.use(morgan("dev"));
        this._app.use((error: Error, req: Request, res: Response, next: Function) => {
            if (error) {
                res.status(400).send(error);
            }
        });

        //setup routes
        this._routes();
        this._server = http.createServer(this._app);
    }

    private _routes(): void {
        //Just for checking the server
        this._app.use("/", express.Router().get('/', (req, res, next) => {
            res.json("Hello World uemail server has started!");
        }));
    }

    private _onError(error: any): void {
        console.log(error);
    }

    private _onListening(): void {
        let address = this._server.address();
        let bind = `port ${address.port}`;
        console.log(`Listening on ${bind}.`);
    };

    start(port: number): void {
        this._server.listen(port);
        this._server.on("error", error => this._onError(error));
        this._server.on("listening", () => this._onListening());
    }
}

export default new Server();