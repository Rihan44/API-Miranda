import 'dotenv/config';
import mysql from 'mysql2/promise';

async function ConnectionSQL(){
    const connection = mysql.createConnection(
        {
            host:process.env.SQL_SERVER, 
            user: process.env.SQL_USER, 
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATA_DB, 
            port: 3307
        }
    );

    console.log('Conectado a SQL correctamente');
    return connection;
} 

export default ConnectionSQL;

