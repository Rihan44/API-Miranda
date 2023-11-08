import Joi from 'joi';

export const RoomSchema = Joi.object({
    room_photo: Joi.string(),
    room_type: Joi.string(),
    room_number: Joi.number(),
    price: Joi.number(),
    offer_price: Joi.boolean(),
    discount: Joi.number().max(100),
    status: Joi.string(),
    description: Joi.string().min(3).max(150),
})

