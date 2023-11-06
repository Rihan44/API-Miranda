import { IContact } from "../interfaces/Icontact";
import ConnectionSQL from "../utils/connection";

const connection = ConnectionSQL();

async function fetchAll() {
    const connect = await connection;
    const [rows] = await connect.execute("SELECT * FROM contact");
    return rows;
}

async function fetchOne(id: string) {
    const connect = await connection;
    const [rows] = await connect.execute(`SELECT * FROM contact WHERE id = ${id}`);
    return rows;
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

async function create(contactData: IContact) {
    const connect = await connection;
    const dateContact = new Date(contactData.date);
    const dateTime = new Date(contactData.date_time);

    const [rows] = await connect.execute(`INSERT INTO contact (name, email, phone, email_subject, email_description, date, date_time, 
        is_archived) 
    VALUES ("${contactData.name}", '${contactData.email}', '${contactData.phone}', '${contactData.email_subject}', '${contactData.email_description}',
        '${formatDateForMySQL(dateContact)}', '${formatDateTimeForMySQL(dateTime)}', ${contactData.is_archived})`);

    return rows;
}

async function update(id: string, contactData: IContact) {
    const connect = await connection;
    const dateContact = new Date(contactData.date);
    const dateTime = new Date(contactData.date_time);

    const [rows] = await connect.execute(`UPDATE contact SET name ='${contactData.name}', email = '${contactData.email}',
    phone = '${contactData.phone}', email_subject = '${contactData.email_subject}', email_description = '${contactData.email_description}', date = '${formatDateForMySQL(dateContact)}'
    , date_time = '${formatDateTimeForMySQL(dateTime)}', is_archived = ${contactData.is_archived} WHERE id = ${id}`);

    return rows;
}

async function deleteOne(id: string) {
    const connect = await connection;
    const [rows] = await connect.execute(`DELETE FROM contact WHERE id = ${id}`);
    return rows;
}

export const getAll = fetchAll;
export const getOne = fetchOne;
export const deleteContact = deleteOne;
export const createNewContact = create;
export const updateTheContact = update;
