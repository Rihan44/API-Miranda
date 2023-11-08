import {Request, Response, NextFunction} from 'express';
import Joi from 'joi';

export const generateValidation = (schema: Joi.ObjectSchema) => {
    const validation = (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body, {abortEarly: false});
        if(error) {
            console.error('Validation error: ', error);
            return res.status(400).json({})
        }
        next();
    }

    return validation;
}