import {Router, Request, Response} from 'express';
import { bookingData } from '../data/bookingData';
import { IBookings } from '../models/Ibookings';
import { bookingService } from '../services/bookings';

export const bookingsController = Router();

bookingsController.get('/', async(req: Request, res: Response) => {
    res.send(bookingData)
    try {
        const result = bookingService.getAllBookings();
        res.send(result);
    } catch(error) {
        res.status(500).send(`Error ${error}`)
    }
});

bookingsController.get('/:id', async(req: Request<{id: number}>, res: Response) => {
    try{
        const id = req.params.id;
        const result =  await bookingService.getById(id);
        res.send(result);
    } catch(error) {
        res.status(500).send(`Error ${error}`)
    }   
});

bookingsController.put('/:id', async(req: Request, res: Response) => {
    res.status(200);
    /* res.status(se ha actualizado) */
});

bookingsController.delete('/:id', async(req: Request<{id: number}>, res: Response) => { 
    try {
        const id = req.params.id;
        const result = await bookingService.delete(id);
        res.send(result);
    } catch(error) {
        res.status(500).send(`Error ${error}`)
    }
});

