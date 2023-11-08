"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersServices = void 0;
const connection_1 = require("../utils/connection");
const utils_1 = require("../utils/utils");
let query = '';
async function getAllUsers() {
    query = 'SELECT * FROM users';
    const row = (0, connection_1.queryExecuter)(query);
    return row;
}
async function getById(id) {
    query = 'SELECT * FROM users WHERE id = =?';
    const row = (0, connection_1.queryExecuter)(query, [id]);
    return row;
}
const formatDateForMySQL = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};
async function createUser(user) {
    const hire_date = new Date(user.hire_date);
    const password_hash = (0, utils_1.hashPassword)(user.password_hash);
    const data = [
        user.name,
        user.email,
        user.photo,
        user.employee_position,
        user.phone_number,
        hire_date,
        user.job_description,
        user.status,
        password_hash
    ];
    query = `INSERT INTO users (name, email, photo, employee_position, phone_number, hire_date, job_description, status, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const row = (0, connection_1.queryExecuter)(query, data);
    return row;
}
async function updateUser(id, updateData) {
    const hire_date = new Date(updateData.hire_date);
    const password_hash = (0, utils_1.hashPassword)(updateData.password_hash);
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
    ];
    const row = (0, connection_1.queryExecuter)(query, dataUpdated);
    return row;
}
async function _delete(id) {
    query = 'DELETE FROM users WHERE id = ?';
    const row = (0, connection_1.queryExecuter)(query, [id]);
    return row;
}
exports.usersServices = {
    getAllUsers,
    getById,
    createUser,
    updateUser,
    delete: _delete,
};
