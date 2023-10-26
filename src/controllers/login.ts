import authService from "../services/login";
import { Request, Response, Router } from "express";

export const loginController = Router();

loginController.post('/',async(req: Request<{ user: string; password: string }>, res: Response) => {
    try {
      const user: string = req.body.user;
      const password: string = req.body.password;

      const loged = await authService.login(user, password);
      res.json(loged);
    } catch (error) {
      res.status(500).send(`${error}`)
    }
  }
);