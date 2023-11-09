import Joi from 'joi';

export const RoomSchema = Joi.object({
    room_photo: Joi.string(),
    room_type: Joi.string().required(),
    room_number: Joi.number().required(),
    price: Joi.number().required(),
    offer_price: Joi.boolean().required(),
    discount: Joi.number().max(100).required(),
    status: Joi.string().required(),
    description: Joi.string().min(3).max(150).required(),
})

