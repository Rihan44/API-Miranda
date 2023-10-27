import {Router, Request, Response} from 'express';
import { IUsers } from '../models/Iusers';
import { usersServices } from '../services/users';

export const usersController = Router();

usersController.get('/', async(_req: Request, res: Response) => {
    try {
        const result = await usersServices.getAllUsers();
        res.json(result);
    } catch(error) {
        res.status(500).send(`Error al recoger todos los users ${error}`)
    }
});

usersController.get('/:id', async(req: Request<{id: number}>, res: Response) => {
    try{
        const id = req.params.id;
        const result =  await usersServices.getById(id);
        res.json(result);
    } catch(error) {
        res.status(500).send(`Error al recoger un user ${error}`)
    }   
});

usersController.post('/', async(req: Request, res: Response) => {
    try {
        const createdUser: IUsers = req.body;
        const result = await usersServices.createUser(createdUser);
        res.json(result)
    } catch (error) {
        res.status(500).send(`Error al crear un user ${error}`)
    }
});

usersController.put('/:id', async(req: Request, res: Response) => {
    try {
        const user = await usersServices.getById(parseInt(req.params.id));
        await usersServices.updateUser(parseInt(req.params.id), req.body);
        res.json(user);
    } catch (error) {
        res.status(500).send(`Error al actualizar un user ${error}`)
    }
});

usersController.delete('/:id', async(req: Request<{id: number}>, res: Response) => { 
    try {
        const id = req.params.id;
        const result = await usersServices.delete(id);
        res.send(result);
    } catch(error) {
        res.status(500).send(`Error al borrar el user ${error}`)
    }
});

