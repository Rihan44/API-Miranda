import Joi from 'joi';

export const ContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'es'] } }),
    phone: Joi.string(),
    email_subject: Joi.string().max(10),
    email_description: Joi.string().min(3).max(150),
    date: Joi.string(),
    date_time: Joi.string(),
    is_archived: Joi.boolean(),
})

