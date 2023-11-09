import Joi from 'joi';

export const BookingSchema = Joi.object({
    guest: Joi.string().required(),
    phone_number: Joi.string().required(),
    order_date: Joi.string().required(),
    check_in: Joi.string(),
    check_out: Joi.string(),
    special_request: Joi.string().min(3).max(100),
    status: Joi.string().required(), 
    price: Joi.number().required(),
    room_id: Joi.number().required(),
})

