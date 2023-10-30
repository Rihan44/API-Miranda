import {Router, Request, Response, NextFunction} from 'express';
import { bookingService } from '../services/bookings';
import { IBookings } from '../interfaces/Ibookings';

export const bookingsController = Router();

bookingsController.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await bookingService.getAllBookings();
        res.json({result, success: true});
    } catch(error) {
        next(error);
    }
});

bookingsController.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;
        const result =  await bookingService.getById(id);
        res.json({result, success: true});
    } catch(error) {
        next(error);
    }   
});

bookingsController.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingCreated: IBookings = req.body;
        const result = await bookingService.createBooking(bookingCreated);
        res.json({result, success: true})
    } catch (error) {
        next(error);
    }
});

bookingsController.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingUpdated = await bookingService.updateBooking(req.params.id, req.body);
        res.json({bookingUpdated, success: true});
    } catch (error) {
        next(error);
    }
});

bookingsController.delete('/:id', async(req: Request, res: Response, next: NextFunction) => { 
    try {
        const id = req.params.id;
        const result = await bookingService.delete(id);
        res.json({result, success: true});
    } catch(error) {
        next(error);
    }
});

