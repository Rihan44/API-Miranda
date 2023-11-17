import {Router, Request, Response, NextFunction} from 'express';
import { roomsService } from '../services/rooms';
import { IRooms } from '../interfaces/Irooms';

export const roomController = Router();

roomController.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await roomsService.getAllRooms();
        res.json({result, success: true});
    } catch(error) {
        next(error);
    }
});

roomController.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;
        const result =  await roomsService.getById(id);
        res.json({result});
    } catch(error) {
        next(error);
    }   
});

roomController.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const roomCreated: IRooms = req.body;
        const result = await roomsService.createRoom(roomCreated);
        res.json({result})
    } catch (error) {
        next(error);
    }
});

roomController.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const room = await roomsService.updateRoom(req.params.id, req.body);
        res.json({room});
    } catch (error) {
        next(error);
    }
});

roomController.delete('/:id', async(req: Request, res: Response, next: NextFunction) => { 
    try {
        const id = req.params.id;
        const room = await roomsService.delete(id);
        res.json({room, success: true});
    } catch(error) {
        next(error);
    }
});

