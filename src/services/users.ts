import { usersData } from "../data/usersData";
import { IUsers } from "../models/Iusers";

export const users = usersData as IUsers[];

async function getAllUsers() {
    const result = await usersData;
    return result;
}

async function getById(id: number) {
    const user = await usersData.find(data => data.id === id.toString());
	if (user === undefined) throw new Error('El id no existe')
    return user;
}

async function createUser(user: IUsers) {
    await usersData.push(user);
    return usersData;
}

async function updateUser(id: number, updateData: Partial<IUsers>) {
    usersData.map((data) => {
        if (data.id == id.toString()) {
            return {
                ...data,
                ...updateData
            }
        }
        return data;
    })
}

async function _delete(id: number) {
    const userUpdated: IUsers[] = await usersData.filter(data => data.id !== id.toString());
    return userUpdated;
}

export const usersServices = {
    getAllUsers,
    getById,
    createUser,
    updateUser,
    delete: _delete,
};