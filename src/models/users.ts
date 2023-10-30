import { usersData } from "../data/usersData";
import { IUsers } from "../interfaces/Iusers";

export const users = usersData as IUsers[];

async function getAllUsers() {
    const result = await usersData;
    return result;
}

async function getById(id: string) {
    const user = await usersData.find(data => data.id === id.toString());
	if (user === undefined) throw new Error('El id no existe')
    return user;
}

async function createUser(user: IUsers) {
    return user;
}

async function updateUser(id: string, updateData: Partial<IUsers>) {
    if(!id) throw new Error('No existe el id')
    return updateData;
}

async function _delete(id: string) {
    if(!id) throw new Error('No existe el id')
    return 'User eliminado';
}

export const usersServices = {
    getAllUsers,
    getById,
    createUser,
    updateUser,
    delete: _delete,
};