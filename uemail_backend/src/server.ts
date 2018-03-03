import * as http from "http";
import * as morgan from 'morgan';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Express, Request, Response } from "express";

//import routers
import { loginRouter } from './routers/LoginRouter';
import { signupRouter } from './routers/SignupRouter';

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
        //Routes Setup

        //Server Check
        this._app.use("/", express.Router().get('/', (req, res, next) => {
            res.json("Uemail server has started successfully");
        }));

        //User Rotuer
        this._app.use('/login', loginRouter);
        this._app.use('/signup', signupRouter);
    }

    private _onError(error: any): void {
        console.log(error);
        throw error;
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