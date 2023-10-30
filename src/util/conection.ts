import mongoose from 'mongoose';

ConectionMongo().catch(err => console.log(err));

async function ConectionMongo(){
    await mongoose.connect('mongodb://localhost:27017/api-miranda');
} 

export default ConectionMongo;

