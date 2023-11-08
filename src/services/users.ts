import { IUsers } from "../interfaces/Iusers";
import {queryExecuter} from "../utils/connection";
import { hashPassword } from "../utils/utils";

let query: string = '';

async function getAllUsers() {
    query = 'SELECT * FROM users';
    const row = queryExecuter(query);
    return row;
}

async function getById(id: string) {
    query = 'SELECT * FROM users WHERE id = =?';
    const row = queryExecuter(query, [id]);
    return row;
}

const formatDateForMySQL = (date: Date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

async function createUser(user: IUsers) {
    const hire_date = new Date(user.hire_date);
    // const password_hash = hashPassword(user.password_hash);

    const data = [
        user.name,
        user.email,
        user.photo,
        user.employee_position,
        user.phone_number,
        hire_date,
        user.job_description,
        user.status,
        user.password_hash
    ]

    query = `INSERT INTO users (name, email, photo, employee_position, phone_number, hire_date, job_description, status, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const row = queryExecuter(query, data);
    return row;
}

async function updateUser(id: string, updateData: IUsers) {
    const hire_date = new Date(updateData.hire_date);
    const password_hash = hashPassword(updateData.password_hash);

    query = 'UPDATE users SET name = ?, email = ?,photo = ?, employee_position = ?, hire_date = ?, job_description = ?, status = ?, password_hash = ? WHERE id = ?';

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

    const row = queryExecuter(query, dataUpdated);
    return row;
}

async function _delete(id: string) {
    query = 'DELETE FROM users WHERE id = ?';
    const row = queryExecuter(query, [id]);
    return row;
}

export const usersServices = {
    getAllUsers,
    getById,
    createUser,
    updateUser,
    delete: _delete,
};