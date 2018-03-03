import { userService } from '../services/UserService';
import { UserInstance } from '../models/interfaces/UserInterface';
import { Request, Response, Router } from 'express';

class SignupRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this._routes();
    }

    public createUser(req: Request, res: Response): void {
        userService.createUser(req.body).then((user: UserInstance) => {
            return res.json(user);
        }).catch((error: Error) => {
            return res.json(error);
        });
    }

    private _routes(): void {
        this.router.post("/", this.createUser);
    }
}

export const signupRouter = new SignupRouter().router;