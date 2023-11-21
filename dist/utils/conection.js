"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
<<<<<<< HEAD
const mysql2_1 = __importDefault(require("mysql2"));
async function ContectionSQL() {
    // create the connection
    const pool = mysql2_1.default.createPool({
        host: process.env.SQL_SERVER,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATA_DB
=======
ConnectionMongo().catch(err => console.log(err));
async function ConnectionMongo() {
    // const urlMongo: string = process.env.MONGO_SERVER || '';
    const urlAtlas = process.env.MONGO_ATLAS || '';
    await (0, mongoose_1.connect)(urlAtlas, {
        dbName: process.env.MONGO_DB || 'api-miranda',
        serverApi: {
            version: mongodb_1.ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
>>>>>>> mongo
    });
    console.log('Conectado a SQL correctamente');
    const promisePool = pool.promise();
    return promisePool;
}
<<<<<<< HEAD
exports.default = ContectionSQL;
=======
exports.default = ConnectionMongo;
>>>>>>> mongo
