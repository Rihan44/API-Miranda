import Joi from 'joi';

export const ContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'es'] } }).required(),
    phone: Joi.string().required(),
    email_subject: Joi.string().max(10).required(),
    email_description: Joi.string().min(3).max(150).required(),
    date: Joi.string().required(),
    date_time: Joi.string().required(),
    is_archived: Joi.boolean().required(),
})

