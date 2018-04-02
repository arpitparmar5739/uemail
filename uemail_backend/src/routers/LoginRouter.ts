import {userService} from '../services/UserService';
import {UserInstance} from '../models/interfaces/UserInterface';
import {Request, Response, Router} from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

class LoginRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._routes();
  }

  public loginUser(req: Request, res: Response): void {
    let username: string = req.body.username;
    let password: string = req.body.password;

    if (
      !username
      || !(username.length > 4 && username.length < 16)
      || !(/^[a-z0-9]+$/ig.test(username))
    ) {
      res.status(422).json({
        "status": 422,
        "message": "Invalid Username!"
      });
    } else if (
      !password
      || !(password.length > -4 && password.length < 16)
    ) {
      res.status(422).json({
        "status": 422,
        "message": "Invalid Password!"
      });
    } else {
      userService.retrieveUser(username).then((user: UserInstance) => {
        if (!!user) {
          if (bcrypt.compareSync(password, user.dataValues.password)) {
            let token: string = jwt.sign(
              {username: user.dataValues.username},
              'my-secret-token-to-change-in-production'
            );

            return res.status(200).json({
              "status": 200,
              "message": {
                "token": token
              }
            });
          }
          return res.status(422).json({
            "status": 422,
            "message": "Invalid Password!"
          });
        }
        return res.status(422).json({
          "status": 422,
          "message": "Invalid Username!"
        });
      }).catch((error: Error) => {
        return res.json({
          "Error": error
        });
      });
    }
  }

  private _routes(): void {
    this.router.post("/", this.loginUser);
  }
}

export const loginRouter = new LoginRouter().router;
