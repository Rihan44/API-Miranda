import { IRequestHeader } from '../interfaces/IRequestHeaders';
import authService from '../models/login'
import { NextFunction, Request, Response } from 'express'

export function authMiddleware(req: Request & {headers: Partial<IRequestHeader>}, res: Response, next: NextFunction) {
  const token = req.headers.token || '';
  try {
    authService.verifyJWT(token);
    next();
  } catch (error) {
    res.status(401).json({error: true, message: 'You are not authorized'})
  }
}