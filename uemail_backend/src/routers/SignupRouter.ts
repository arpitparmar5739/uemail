import {userService} from '../services/UserService';
import {UserInstance} from '../models/interfaces/UserInterface';
import {Request, Response, Router} from 'express';

function validateUser(req: Request): Promise<boolean> {
  return new Promise<boolean>((resolve: Function) => {
    userService.userIsPresent(req.body.username)
      .then((userIsPresent) => {
        if (!userIsPresent) {
          userService.emailIsPresent(req.body.email)
            .then((emailIsPresent) => {
              if (!emailIsPresent) {
                req.check('username', 'Username can not be empty.').exists().trim().not().isEmpty();
                req.check('username', 'Invalid Username').isAlphanumeric().isLength({min: 5, max:15});
                req.check('email', 'Invalid Email').trim().isEmail().isLength({max:50});
                req.check('password', 'Invalid Password')
                  .trim().isLength({min: 5, max:15});
                req.check('password', 'Passwords does not match!')
                  .equals(req.body.confirmPassword);
                req.check('firstname', 'Invalid First Name')
                  .trim().not().isEmpty().isLength({min: 1, max:30});
                req.check('firstname', 'Invalid First Name').isAlpha();
                req.check('lastname', 'Invalid Last Name')
                  .trim().isLength({min: 1, max: 30}).isAlpha();
                req.check('phone', 'Invalid Phone Number')
                  .trim().isLength({min: 10, max: 10}).isNumeric();
              }

              if (emailIsPresent) {
                req.check('email', 'Email already exists!')
                  .not().equals(req.body.email);
              }
              resolve(!req.validationErrors());
            });

        } else {
          req.check('username', 'Username already exists!')
            .not().equals(req.body.username);
          resolve(!req.validationErrors());
        }
      });
  });
}

class SignupRouter {
  public router: Router;
  
  constructor() {
    this.router = Router();
    this._routes();
  }

  public createUser(req: Request, res: Response): void {
    validateUser(req).then((validation) => {
      if (validation) {
        userService.createUser(req.body)
          .then((user: UserInstance) => {
            if (!!user) {
              const message: string = "Signup successful";
              return res.json({
                "status": 200,
                "message": message
              });
            }
          })
          .catch((error) => {
            return res.status(422).send({
              "status": 422,
              "message": error.message
            });
          });
      }
      else {
        let errors = req.validationErrors();
        res.status(422).json({
          "status": 422,
          "message": errors
        });
      }
    });
  }

  private _routes(): void {
    this.router.post("/", this.createUser);
  }
}

export const
  signupRouter = new SignupRouter().router;
