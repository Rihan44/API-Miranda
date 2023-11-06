"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mysql2_1 = __importDefault(require("mysql2"));
async function ContectionSQL() {
    // create the connection
    const pool = mysql2_1.default.createPool({
        host: process.env.SQL_SERVER,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATA_DB
    });
    console.log('Conectado a SQL correctamente');
    const promisePool = pool.promise();
    return promisePool;
}
exports.default = ContectionSQL;
