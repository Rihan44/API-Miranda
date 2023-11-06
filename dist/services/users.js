"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersServices = void 0;
const users_model_1 = require("../models/users.model");
async function getAllUsers() {
    const result = await (0, users_model_1.getAll)();
    return result;
}
async function getById(id) {
    const user = await (0, users_model_1.getOne)(id);
    if (user === undefined)
        throw new Error('El id no existe');
    return user;
}
async function createUser(user) {
    await (0, users_model_1.createNewUser)(user);
    return user;
}
async function updateUser(id, updateData) {
    if (!id)
        throw new Error('No existe el id');
    await (0, users_model_1.updateTheUser)(id, updateData);
    return updateData;
}
async function _delete(id) {
    if (!id)
        throw new Error('No existe el id');
    await (0, users_model_1.deleteUser)(id);
    return;
}
exports.usersServices = {
    getAllUsers,
    getById,
    createUser,
    updateUser,
    delete: _delete,
};
