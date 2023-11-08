import Joi from 'joi';

export const UserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    photo: Joi.string(),
    employee_position: Joi.number(),
    phone_number: Joi.number().min(3)
    .max(30),
    hire_date: Joi.number(),
    job_description: Joi.string(),
    status: Joi.string(),
    password_hash: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

