
import express, {Express, Request, Response, NextFunction} from 'express';
import cors from 'cors';

import { bookingsController } from './controllers/bookings';

export const app: Express = express()

// middlewares
app.use(cors())
app.use(express.json())

// public routes
/* app.use('/login', loginController) */

// private routes
app.use('/bookings', bookingsController);
app.use('/users', bookingsController);
app.use('/rooms', bookingsController);
app.use('/contact', bookingsController);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return res.status(500).json({error: true, message: 'Application error'});
});