import 'dotenv/config';
import mysql from 'mysql2';

async function ContectionSQL(){
    // create the connection
    const pool = mysql.createPool(
        {
            host:process.env.SQL_SERVER, 
            user: process.env.SQL_USER, 
            password: process.env.SQL_PASSWORD, 
            database: process.env.SQL_DATA_DB
        }
    );

    console.log('Conectado a SQL correctamente');
    const promisePool = pool.promise();
    return promisePool;
} 

export default ContectionSQL;

