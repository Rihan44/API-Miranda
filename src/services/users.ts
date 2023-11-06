import { IUsers } from "../interfaces/Iusers";
import { createNewUser, deleteUser, getAll, getOne } from "../models/users.model";

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
    const result = await createNewUser(user);
    return result;
}

async function updateUser(id: string, updateData: IUsers) {
    if(!id) throw new Error('No existe el id');
    await updateUser(id, updateData);
    return updateData;
}

async function _delete(id: string) {
    if(!id) throw new Error('No existe el id');
    await deleteUser(id);
    return 'User eliminado';
}

export const usersServices = {
    getAllUsers,
    getById,
    createUser,
    updateUser,
    delete: _delete,
};