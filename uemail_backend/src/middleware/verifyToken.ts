import {Request, Response, NextFunction} from "express";

export default function verifyToken (req: Request, res: Response, next: NextFunction) {
  const bearerToken = <string>req.headers['authorization'];
  if(typeof bearerToken !== 'undefined') {
    req["token"] = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}
