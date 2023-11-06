"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTheContact = exports.createNewContact = exports.deleteContact = exports.getOne = exports.getAll = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
const connection = (0, connection_1.default)();
async function fetchAll() {
    const connect = await connection;
    const [rows] = await connect.execute("SELECT * FROM contact");
    return rows;
}
async function fetchOne(id) {
    const connect = await connection;
    const [rows] = await connect.execute(`SELECT * FROM contact WHERE id = ${id}`);
    return rows;
}
const formatDateForMySQL = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};
const formatDateTimeForMySQL = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
async function create(contactData) {
    const connect = await connection;
    const [rows] = await connect.execute(`INSERT INTO contact (name, email, phone, email_subject, email_description, date, date_time, 
        is_archived) 
    VALUES ("${contactData.name}", '${contactData.email}', '${contactData.phone}', '${contactData.email_subject}', '${contactData.email_description}',
        '${formatDateForMySQL(contactData.date)}', '${formatDateTimeForMySQL(contactData.date_time)}', ${contactData.is_archived})`);
    return rows;
}
async function update(id, contactData) {
    const connect = await connection;
    const [rows] = await connect.execute(`UPDATE contact SET name ='${contactData.name}', email = '${contactData.email}',
    phone = '${contactData.phone}', email_subject = '${contactData.email_subject}', email_description = '${contactData.email_description}', date = '${contactData.date}'
    , date_time = '${contactData.date_time}', is_archived = ${contactData.is_archived} WHERE id = ${id}`);
    return rows;
}
async function deleteOne(id) {
    const connect = await connection;
    const [rows] = await connect.execute(`DELETE * FROM contact WHERE id = ${id}`);
    return rows;
}
exports.getAll = fetchAll;
exports.getOne = fetchOne;
exports.deleteContact = deleteOne;
exports.createNewContact = create;
exports.updateTheContact = update;
