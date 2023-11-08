import Joi from 'joi';

export const BookingSchema = Joi.object({
    guest: Joi.string(),
    phone_number: Joi.string(),
    order_date: Joi.string(),
    check_in: Joi.string(),
    check_out: Joi.string(),
    special_request: Joi.string().min(3).max(100),
    status: Joi.string(), 
    price: Joi.number(),
    room_id: Joi.number(),
})

