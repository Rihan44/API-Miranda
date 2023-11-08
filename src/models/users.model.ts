import Joi from 'joi';

export const UserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'es'] } }),
    photo: Joi.string(),
    employee_position: Joi.string(),
    phone_number: Joi.string().min(3).max(20),
    hire_date: Joi.string(),
    job_description: Joi.string(),
    status: Joi.boolean(),
    password_hash: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

