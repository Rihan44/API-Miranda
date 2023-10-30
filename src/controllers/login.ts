import authService from "../models/login";
import { NextFunction, Request, Response, Router } from "express";

export const loginController = Router();

loginController.post('/',async(req: Request, res: Response, next: NextFunction) => {
    try {
      const user: string = req.body.user;
      const password: string = req.body.password;

      const loged = await authService.login(user, password);
      res.json(loged);
    } catch (error) {
      next(error)
    }
  }
);