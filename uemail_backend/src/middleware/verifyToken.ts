import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
  const bearerToken = <string>req.headers['authorization'];
  if (typeof bearerToken !== 'undefined') {
    req["token"] = bearerToken.split(" ")[1];
    jwt.verify(req['token'],
      'my-secret-token-to-change-in-production', (err, authData) => {
        if (err) {
          res.sendStatus(401);
        } else {
          req['authData'] = authData;
          next();
        }
      });
  } else {
    res.sendStatus(401);
  }
}
