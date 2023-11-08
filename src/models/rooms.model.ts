import Joi from 'joi';

export const RoomSchema = Joi.object({
    room_photo: Joi.string(),
    room_type: Joi.string(),
    room_number: Joi.number(),
    price: Joi.number(),
    offer_price: Joi.boolean(),
    discount: Joi.number(),
    status: Joi.string(),
    description: Joi.string(),
})

