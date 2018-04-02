import {Request, Response, Router} from "express";
import * as jwt from 'jsonwebtoken';
import verifyToken from "../middleware/verifyToken";

class HomePageRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._routes();
  }

  private _getHomePage(req: Request, res: Response) {
    jwt.verify(req['token'],
      'my-secret-token-to-change-in-production', (err, authData) => {
      if(err) {
        res.sendStatus(401);
      } else {
        res.status(200).json(authData);
      }
    });
  }

  private _routes() {
    this.router.get('/', [verifyToken], this._getHomePage);
  }
}

export const homePageRouter = new HomePageRouter().router;
