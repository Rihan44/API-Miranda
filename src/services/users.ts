import { IUsers } from "../interfaces/Iusers";
import {queryExecuter} from "../utils/connection";
import { hashPassword } from "../utils/utils";


async function getAllUsers() {
    const query = 'SELECT * FROM users';
    const row = await queryExecuter(query);
    return row;
}

async function getById(id: string) {
    const query = 'SELECT * FROM users WHERE id = =?';
    const row = await queryExecuter(query, [id]);
    return row;
}

const formatDateForMySQL = (date: Date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

async function createUser(user: IUsers) {
    const hire_date = new Date(user.hire_date);
    const password_hash = hashPassword(user.password_hash);

    const data = [
        user.name,
        user.email,
        user.photo,
        user.employee_position,
        user.phone_number,
        formatDateForMySQL(hire_date),
        user.job_description,
        user.status,
        password_hash
    ]

    const query = `INSERT INTO users (name, email, photo, employee_position, phone_number, hire_date, job_description, status, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await queryExecuter(query, data);
}

async function updateUser(id: string, updateData: IUsers) {
    const hire_date = new Date(updateData.hire_date);
    const password_hash = hashPassword(updateData.password_hash);

    const query = 'UPDATE users SET name = ?, email = ?,photo = ?, employee_position = ?, hire_date = ?, job_description = ?, status = ?, password_hash = ? WHERE id = ?';

    const dataUpdated = [
        updateData.name,
        updateData.email,
        updateData.employee_position,
        updateData.phone_number,
        hire_date,
        updateData.job_description,
        updateData.status,
        password_hash,
        id
    ]

    await queryExecuter(query, dataUpdated);
}

async function _delete(id: string) {
    const query = 'DELETE FROM users WHERE id = ?';
    await queryExecuter(query, [id]);
}

export const usersServices = {
    getAllUsers,
    getById,
    createUser,
    updateUser,
    delete: _delete,
};