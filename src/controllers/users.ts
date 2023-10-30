import {Router, Request, Response, NextFunction} from 'express';
import { IUsers } from '../interfaces/Iusers';
import { usersServices } from '../services/users';

export const usersController = Router();

usersController.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await usersServices.getAllUsers();
        res.json({result, success: true});
    } catch(error) {
        next(error);
    }
});

usersController.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;
        const result =  await usersServices.getById(id);
        res.json({result, success: true});
    } catch(error) {
        next(error);
    }   
});

usersController.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const createdUser: IUsers = req.body;
        const result = await usersServices.createUser(createdUser);
        res.json({result, success: true})
    } catch (error) {
        next(error);
    }
});

usersController.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userUpdated = await usersServices.updateUser(req.params.id, req.body);
        res.json({userUpdated, success: true});
    } catch (error) {
        next(error);
    }
});

usersController.delete('/:id', async(req: Request, res: Response, next: NextFunction) => { 
    try {
        const id = req.params.id;
        const result = await usersServices.delete(id);
        res.json({result, success: true});
    } catch(error) {
        next(error);
    }
});

