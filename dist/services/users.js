"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersServices = void 0;
const users_model_1 = require("../models/users.model");
async function getAllUsers() {
    const result = await users_model_1.UsersModel.find();
    return result;
}
async function getById(id) {
    const user = await users_model_1.UsersModel.findById(id).exec();
    if (user === undefined)
        throw new Error('El id no existe');
    return user;
}
async function createUser(user) {
    const result = await users_model_1.UsersModel.create(user);
    return result;
}
async function updateUser(id, updateData) {
    if (!id)
        throw new Error('No existe el id');
    await users_model_1.UsersModel.findByIdAndUpdate(id, updateData);
    return updateData;
}
async function _delete(id) {
    if (!id)
        throw new Error('No existe el id');
    await users_model_1.UsersModel.findByIdAndDelete(id);
    return 'User eliminado';
}
exports.usersServices = {
    getAllUsers,
    getById,
    createUser,
    updateUser,
    delete: _delete,
};
