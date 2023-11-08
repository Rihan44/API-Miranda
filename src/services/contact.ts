import { IContact } from "../interfaces/Icontact";
import {queryExecuter} from "../utils/connection";

let query: string = '';

async function getAllContact() {
    query = 'SELECT * FROM contact';
    const row = queryExecuter(query);
    return row;
}

async function getById(id: string) {
    query = 'SELECT * FROM contact WHERE id = ?';
    const row = queryExecuter(query, [id]);
    return row;
}

const formatDateForMySQL = (date: Date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

const  formatDateTimeForMySQL = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function createContact(contact: IContact) {
    const date = new Date(contact.date);
    const date_time = new Date(contact.date_time);

    const data = [
        contact.name,
        contact.email,
        contact.phone,
        contact.email_subject,
        contact.email_description,
        formatDateForMySQL(date),
        formatDateTimeForMySQL(date_time),
        contact.is_archived
    ]

    query = `INSERT INTO contact (name, email, phone, email_subject, email_description, date, date_time, is_archived) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;


    const row = queryExecuter(query, data);
    return row;
}

async function updateContact(id: string, updateData: IContact) {
    const date = new Date(updateData.date);
    const date_time = new Date(updateData.date_time);

    const dataUpdated = [
        updateData.name,
        updateData.email,
        updateData.phone,
        updateData.email_subject,
        updateData.email_description,
        formatDateForMySQL(date),
        formatDateTimeForMySQL(date_time),
        updateData.is_archived,
        id
    ]

    query = `UPDATE contact SET name =?, email = ?,phone = ?, email_subject = ?, email_description = ?, date =? , date_time = ?, is_archived = ? WHERE id = ?`;

    const row = queryExecuter(query, dataUpdated);
    return row;
}

async function _delete(id: string) {
    query = 'DELETE FROM contact WHERE id = ?'
    const row = queryExecuter(query, [id]);
    return row;
}

export const contactService = {
    getAllContact,
    getById,
    createContact,
    updateContact,
    delete: _delete,
};