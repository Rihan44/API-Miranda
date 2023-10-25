import authService from "../services/login";
import { Request, Response, Router } from "express";

export const loginController = Router();

loginController.post("/",async (req: Request<{}, {}, { user: string; pass: string }>, res: Response) => {
    
  }
);