import {Router, Request, Response} from 'express';
import { bookingData } from '../data/bookingData';
import { bookingService } from '../services/bookings';
import { IBookings } from '../models/Ibookings';

export const bookingsController = Router();

bookingsController.get('/', async(_req: Request, res: Response) => {
    res.send(bookingData)
    try {
        const result = bookingService.getAllBookings();
        res.json(result);
    } catch(error) {
        res.status(500).send(`Error al recoger todos los bookings ${error}`)
    }
});

bookingsController.get('/:id', async(req: Request<{id: number}>, res: Response) => {
    try{
        const id = req.params.id;
        const result =  await bookingService.getById(id);
        res.json(result);
    } catch(error) {
        res.status(500).send(`Error al recoger un booking ${error}`)
    }   
});

bookingsController.post('/', async(req: Request, res: Response) => {
    try {
        const bookingCreate: IBookings = req.body;
        const result = await bookingService.createBooking(bookingCreate);
        res.json(result)
    } catch (error) {
        
    }
});

bookingsController.put('/:id', async(req: Request, res: Response) => {
    try {
        const booking = await bookingService.getById(parseInt(req.params.id));
        await bookingService.updateBooking(parseInt(req.params.id), req.body);
        res.json(booking);
    } catch (error) {
        res.status(500).send(`Error al actualizar el booking ${error}`)
    }
});

bookingsController.delete('/:id', async(req: Request<{id: number}>, res: Response) => { 
    try {
        const id = req.params.id;
        const result = await bookingService.delete(id);
        res.send(result);
    } catch(error) {
        res.status(500).send(`Error al borrar el booking ${error}`)
    }
});

