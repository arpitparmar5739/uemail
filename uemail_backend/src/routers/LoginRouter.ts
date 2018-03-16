import {userService} from '../services/UserService';
import {UserInstance} from '../models/interfaces/UserInterface';
import {Request, Response, Router} from 'express';

class LoginRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._routes();
  }

  public loginUser(req: Request, res: Response): void {
    let username: string = req.body.username;
    let password: string = req.body.password;
    userService.retrieveUser(username, password).then((user: UserInstance) => {
      if (!!user) {
        return res.json(user);
      } else {
        return res.json({"message": "Invalid username/password!"});
      }
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
