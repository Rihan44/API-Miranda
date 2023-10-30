import {connect} from 'mongoose';
import 'dotenv/config';

ConectionMongo().catch(err => console.log(err));

async function ConectionMongo(){
    const urlMongo: string = process.env.MONGO_SERVER || '';
    await connect(urlMongo, {
        dbName: process.env.MONGO_DB || 'api-miranda'
    });
    console.log('Conectado a Mongo correctamente');
} 

export default ConectionMongo;

