import {Router, Request, Response} from 'express';
import { contactService } from '../services/contact';
import { IContact } from '../models/Icontact';

export const contactController = Router();

contactController.get('/', async(_req: Request, res: Response) => {
    try {
        const result = await contactService.getAllContact();
        res.json(result);
    } catch(error) {
        res.status(500).send(`Error al recoger todas los contact message ${error}`)
    }
});

contactController.get('/:id', async(req: Request<{id: number}>, res: Response) => {
    try{
        const id = req.params.id;
        const result =  await contactService.getById(id);
        res.json(result);
    } catch(error) {
        res.status(500).send(`Error al recoger un contact message ${error}`)
    }   
});

contactController.post('/', async(req: Request, res: Response) => {
    try {
        const createdContact: IContact = req.body;
        const result = await contactService.createContact(createdContact);
        res.json(result)
    } catch (error) {
        res.status(500).send(`Error al crear un contact message ${error}`)
    }
});

contactController.put('/:id', async(req: Request, res: Response) => {
    try {
        const contact = await contactService.getById(parseInt(req.params.id));
        await contactService.updateContact(parseInt(req.params.id), req.body);
        res.json(contact);
    } catch (error) {
        res.status(500).send(`Error al actualizar un contact message ${error}`)
    }
});

contactController.delete('/:id', async(req: Request<{id: number}>, res: Response) => { 
    try {
        const id = req.params.id;
        const result = await contactService.delete(id);
        res.send(result);
    } catch(error) {
        res.status(500).send(`Error al borrar el contact message ${error}`)
    }
});

