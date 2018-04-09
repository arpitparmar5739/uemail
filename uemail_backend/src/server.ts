import * as http from "http";
import * as morgan from 'morgan';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressValidator from 'express-validator';
import { Express, NextFunction, Request, Response } from "express";

//import routers
import { loginRouter } from './routers/LoginRouter';
import { signupRouter } from './routers/SignupRouter';
import { userRouter } from "./routers/UserRouter";
import { homePageRouter } from "./routers/HomePageRouter";
import { emailRouter } from './routers/EmailRouter';

class Server {
  private _app: Express;
  private _server: http.Server;

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
    this._app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
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

  start(port: number): void {
    this._server.listen(port);
    this._server.on("error", error => this._onError(error));
    this._server.on("listening", () => this._onListening());
  }

  private _routes(): void {
    //Routes Setup

    //Server Check
    this._app.use("/", express.Router().get('/', (req: Request, res: Response) => {
      res.json("Uemail server has started successfully");
    }));

    this._app.use('/users', userRouter);
    this._app.use('/login', loginRouter);
    this._app.use('/signup', signupRouter);
    this._app.use('/home', homePageRouter);
    this._app.use('/email', emailRouter);
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
}

export default new Server();
