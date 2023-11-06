import { IUsers } from "../interfaces/Iusers";
import { createNewUser, deleteUser, getAll, getOne, updateTheUser } from "../models/users.model";

async function getAllUsers() {
    const result = await getAll();
    return result;
}

async function getById(id: string) {
    const user = await getOne(id);
	if (user === undefined) throw new Error('El id no existe')
    return user;
}

async function createUser(user: IUsers) {
    await createNewUser(user);
    return user;
}

async function updateUser(id: string, updateData: IUsers) {
    if(!id) throw new Error('No existe el id');
    await updateTheUser(id, updateData);
    return updateData;
}

async function _delete(id: string) {
    if(!id) throw new Error('No existe el id');
    await deleteUser(id);
    return;
}

export const usersServices = {
    getAllUsers,
    getById,
    createUser,
    updateUser,
    delete: _delete,
};