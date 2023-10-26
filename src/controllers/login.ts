import authService from "../services/login";
import { Request, Response, Router } from "express";

export const loginController = Router();

loginController.post("/",async (req: Request<{}, { user: string; pass: string }>, res: Response) => {
    try {
      const user: string = req.body.user;
      const pass: string = req.body.pass;
  
      authService.login(user, pass);
    } catch (error) {
      res.status(500).send(`${error}`)
    }
  }
);