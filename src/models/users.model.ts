import Joi from 'joi';

export const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'es'] } }).required(),
    photo: Joi.string(),
    employee_position: Joi.string().required(),
    phone_number: Joi.string().min(3).max(20).required(),
    hire_date: Joi.string(),
    job_description: Joi.string().max(150).required(),
    status: Joi.boolean().required(),
    password_hash: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

