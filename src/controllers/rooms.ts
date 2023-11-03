import {Router, Request, Response, NextFunction} from 'express';
import { roomsService } from '../services/rooms';
import { IRooms } from '../interfaces/Irooms';

export const roomController = Router();

roomController.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await roomsService.getAllRooms();
        res.json({rooms, success: true});
    } catch(error) {
        next(error);
    }
});

roomController.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;
        const rooms =  await roomsService.getById(id);
        res.json({rooms});
    } catch(error) {
        next(error);
    }   
});

roomController.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const roomCreated: IRooms = req.body;
        const rooms = await roomsService.createRoom(roomCreated);
        res.json({rooms})
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

