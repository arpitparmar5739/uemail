import { userService } from '../services/UserService';
import { UserInstance } from '../models/interfaces/UserInterface';
import { Request, Response, Router } from 'express';
import verifyToken from "../middleware/verifyToken";
import * as jwt from 'jsonwebtoken';

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._routes();
  }

  public getUser(req: Request, res: Response): void {
    jwt.verify(req['token'], 'my-secret-token-to-change-in-production', (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        let username: string = authData.username;
        userService.retrieveUser(username).then((user: UserInstance) => {
          if (!!user) {
            return res.json({
              "username": user.dataValues.username,
              "email": user.dataValues.email,
              "firstname": user.dataValues.firstname,
              "lastname": user.dataValues.lastname,
              "phone": user.dataValues.phone
            });
          } else {
            return res.json({ "message": "Invalid username/password!" });
          }
        }).catch((error: Error) => {
          return res.json({
            "Error": error
          });
        });
      }
    });
  }

  public getUsers(req: Request, res: Response): void {
    jwt.verify(req['token'], 'my-secret-token-to-change-in-production', (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        userService.retrieveUsers().then((users: Array<UserInstance>) => {
          return res.json(users);
        }).catch((error: Error) => {
          return res.json(error);
        });
      }
    });
  }

  private _routes(): void {
    this.router.get("/", [verifyToken], this.getUsers);
    this.router.get("/:username", [verifyToken], this.getUser);
  }
}

export const userRouter = new UserRouter().router;
