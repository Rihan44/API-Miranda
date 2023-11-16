import bcrypt from "bcryptjs";
import { IUsers } from "../interfaces/Iusers";
import { UsersModel } from "../models/users.model";

async function getAllUsers() {
    const result = await UsersModel.find();
    return result;
}

async function getById(id: string) {
    const user = await UsersModel.findById(id).exec();
	if (user === undefined) throw new Error('El id no existe')
    return user;
}

async function createUser(user: IUsers) {
    user.password_hash = bcrypt.hashSync(user.password_hash || '', 10);
    const result = await UsersModel.create(user);
    return result;
}

async function updateUser(id: string, updateData: Partial<IUsers>) {
    if(!id) throw new Error('No existe el id');
    updateData.password_hash = bcrypt.hashSync(updateData.password_hash || '', 10);
    await UsersModel.findByIdAndUpdate(id, updateData);
    return updateData;
}

async function _delete(id: string) {
    if(!id) throw new Error('No existe el id');
    await UsersModel.findByIdAndDelete(id);
    return 'User eliminado';
}

export const usersServices = {
    getAllUsers,
    getById,
    createUser,
    updateUser,
    delete: _delete,
};