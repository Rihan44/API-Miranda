"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
    user.password_hash = bcryptjs_1.default.hashSync(user.password_hash || '', 10);
    const result = await users_model_1.UsersModel.create(user);
    return result;
}
async function updateUser(id, updateData) {
    if (!id)
        throw new Error('No existe el id');
    updateData.password_hash = bcryptjs_1.default.hashSync(updateData.password_hash || '', 10);
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
