import {Router, Request, Response} from 'express';
import { roomsService } from '../services/rooms';
import { IRooms } from '../models/Irooms';

export const roomController = Router();

roomController.get('/', async(_req: Request, res: Response) => {
    try {
        const result = await roomsService.getAllRooms();
        res.json(result);
    } catch(error) {
        res.status(500).send(`Error al recoger todas las rooms ${error}`)
    }
});

roomController.get('/:id', async(req: Request<{id: number}>, res: Response) => {
    try{
        const id = req.params.id;
        const result =  await roomsService.getById(id);
        res.json(result);
    } catch(error) {
        res.status(500).send(`Error al recoger una room ${error}`)
    }   
});

roomController.post('/', async(req: Request, res: Response) => {
    try {
        const roomCreate: IRooms = req.body;
        const result = await roomsService.createRoom(roomCreate);
        res.json(result)
    } catch (error) {
        res.status(500).send(`Error al crear una room ${error}`)
    }
});

roomController.put('/:id', async(req: Request, res: Response) => {
    try {
        const room = await roomsService.getById(parseInt(req.params.id));
        await roomsService.updateRoom(parseInt(req.params.id), req.body);
        res.json(room);
    } catch (error) {
        res.status(500).send(`Error al actualizar la room ${error}`)
    }
});

roomController.delete('/:id', async(req: Request<{id: number}>, res: Response) => { 
    try {
        const id = req.params.id;
        const result = await roomsService.delete(id);
        res.send(result);
    } catch(error) {
        res.status(500).send(`Error al borrar la room ${error}`)
    }
});

