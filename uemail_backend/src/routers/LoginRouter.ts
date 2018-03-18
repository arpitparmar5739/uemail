import {userService} from '../services/UserService';
import {UserInstance} from '../models/interfaces/UserInterface';
import {Request, Response, Router} from 'express';
import * as bcrypt from 'bcrypt';

class LoginRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._routes();
  }

  public loginUser(req: Request, res: Response): void {
    let username: string = req.body.username;
    let password: string = req.body.password;
    userService.retrieveUser(username).then((user: UserInstance) => {
      if (!!user) {
        if (bcrypt.compareSync(password, user.dataValues.password)) {
          return res.status(200).json({
            "status": 200,
            "message": {
              "username": user.dataValues.username,
              "firstname": user.dataValues.firstname,
              "lastname": user.dataValues.lastname
            }
          });
        }
        return res.status(422).json({
          "status": 422,
          "message": "Invalid password!"
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

  private _routes(): void {
    this.router.post("/", this.loginUser);
  }
}

export const loginRouter = new LoginRouter().router;
