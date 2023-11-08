import Joi from 'joi';

export const RoomSchema = Joi.object({
    room_photo: Joi.string(),
    room_type: Joi.string(),
    price: Joi.number(),
    offer_price: Joi.boolean(),
    discount: Joi.number(),
    status: Joi.string(),
    description: Joi.string(),
})
.with('username', 'birth_year')
.xor('password', 'access_token')
.with('password', 'repeat_password');

RoomSchema.validate({});


