"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTheUser = exports.createNewUser = exports.deleteUser = exports.getOne = exports.getAll = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
const connection = (0, connection_1.default)();
async function fetchAll() {
    const connect = await connection;
    const [rows] = await connect.execute("SELECT * FROM users");
    return rows;
}
async function fetchOne(id) {
    const connect = await connection;
    const [rows] = await connect.execute(`SELECT * FROM users WHERE id = ${id}`);
    return rows;
}
const formatDateForMySQL = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};
async function create(userData) {
    const connect = await connection;
    const [rows] = await connect.execute(`INSERT INTO users (name, email, photo, employee_position, phone_number, hire_date, job_description, 
        status, password_hash) 
    VALUES ('${userData.name}', '${userData.email}', '${userData.photo}', '${userData.employee_position}', '${userData.phone_number}',
        '${formatDateForMySQL(userData.hire_date)}', '${userData.job_description}', ${userData.status}, '${userData.password_hash}')`);
    return rows;
}
async function update(id, userData) {
    const connect = await connection;
    const [rows] = await connect.execute(`UPDATE users SET name ='${userData.name}', email = '${userData.email}',
    photo = '${userData.photo}', employee_position = '${userData.employee_position}', phone_number = '${userData.phone_number}', hire_date = '${userData.hire_date}'
    , job_description = '${userData.job_description}', status = ${userData.status}, password_hash = ${userData.password_hash} WHERE id = ${id}`);
    return rows;
}
async function deleteOne(id) {
    const connect = await connection;
    const [rows] = await connect.execute(`DELETE * FROM users WHERE id = ${id}`);
    return rows;
}
exports.getAll = fetchAll;
exports.getOne = fetchOne;
exports.deleteUser = deleteOne;
exports.createNewUser = create;
exports.updateTheUser = update;
