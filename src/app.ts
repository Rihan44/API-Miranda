
import express, {Express, Request, Response, NextFunction} from 'express';
import cors from 'cors';

import { bookingsController } from './controllers/bookings';
import { roomController } from './controllers/rooms';
import { contactController } from './controllers/contact';
import { usersController } from './controllers/users';

export const app: Express = express()

// middlewares
app.use(cors())
app.use(express.json())

// public routes
/* app.use('/login', loginController) */

// private routes
app.use('/bookings', bookingsController);
app.use('/users', usersController);
app.use('/rooms', roomController);
app.use('/contacts', contactController);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return res.status(500).json({error: true, message: 'Application error'});
});