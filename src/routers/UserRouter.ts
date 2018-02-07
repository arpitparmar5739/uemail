import { userService } from '../services/UserService';
import { UserInstance } from '../models/interfaces/UserInterface';
import { Request, Response, Router} from 'express';

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this._routes();
    }

    createUser(req: Request, res: Response): void {
        userService.createUser(req.body).then((user: UserInstance) => {
            return res.json(user);
        }).catch((error: Error) => {
            return res.json(error);
        });
    }

    public getUsers(req: Request, res: Response): void {
        userService.retrieveUsers().then((users: Array<UserInstance>) => {
            return res.json(users);
        }).catch((error: Error) => {
            return res.json(error);
        });
    }

    private _routes(): void {
        this.router.get("/", this.getUsers);
        this.router.post("/", this.createUser);
    }
}

export const userRouter = new UserRouter().router;