import {Router, Request, Response, NextFunction} from 'express';
import { contactService } from '../services/contact';
import { IContact } from '../models/Icontact';

export const contactController = Router();

contactController.get('/', async(_req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await contactService.getAllContact();
        res.json({result, success: true});
    } catch(error) {
        next(error);
    }
});

contactController.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;
        const result =  await contactService.getById(id);
        res.json({result, success: true});
    } catch(error) {
        next(error);
    }   
});

contactController.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const createdContact: IContact = req.body;
        const result = await contactService.createContact(createdContact);
        res.json({result, success: true})
    } catch (error) {
        next(error);
    }
});

contactController.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const contactUpdated = await contactService.updateContact(req.params.id, req.body);
        res.json({contactUpdated, success: true});
    } catch (error) {
        next(error);
    }
});

contactController.delete('/:id', async(req: Request, res: Response, next: NextFunction) => { 
    try {
        const id = req.params.id;
        const result = await contactService.delete(id);
        res.json({result, success: true});
    } catch(error) {
        next(error);
    }
});

