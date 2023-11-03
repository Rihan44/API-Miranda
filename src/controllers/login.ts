import authService from "../services/login";
import { NextFunction, Request, Response, Router } from "express";

export const loginController = Router();

loginController.post('/',async(req: Request, res: Response, next: NextFunction) => {
    try {
      const user: string = req.body.user;
      const email: string = req.body.email;
      const password: string = req.body.password;

      const loged = await authService.login(user, password, email);
      res.json(loged);
    } catch (error) {
      next(error)
    }
  }
);