import ConnectionMongo from './utils/conection';
import express, {Express, Request, Response, NextFunction} from 'express';
import {authMiddleware} from './middlewares/auth';
import cors from 'cors';

import { bookingsController } from './controllers/bookings';
import { roomController } from './controllers/rooms';
import { contactController } from './controllers/contact';
import { usersController } from './controllers/users';
import { loginController } from './controllers/login';

import publicJSON from './data/public.json';

ConnectionMongo();

export const app: Express = express();

// middlewares
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: "token",
  }
));
app.use(express.json());

// public routes
app.use('/info', (_req: Request, res: Response) =>res.json(publicJSON));
app.use('/login', loginController)
app.use(authMiddleware);

// private routes
app.use('/bookings', bookingsController);
app.use('/users', usersController);
app.use('/rooms', roomController);
app.use('/contacts', contactController);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return res.status(500).json({error: true, message: 'Application error'});
});