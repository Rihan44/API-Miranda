import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UsersModel } from '../models/users.model';

const defaultUser = {
    user: "ASdev",
    email:"asmuela.dev@gmail.com",
    password: 'ASdev12345'
};

const secret_key: string = process.env.SECRET_KEY || '';

async function login(password: string, email: string) {
    const resultFindUser = await UsersModel.findOne({email: email});
    
    if(!resultFindUser) throw new Error('User not found');
    const user: string = resultFindUser.name;
     
    return signJWT({user, email});
}

function signJWT(payload: { user: string, email: string }) {
    const token = jwt.sign(payload, secret_key, {expiresIn: '10y'});
    return {payload, token};
}

function verifyJWT(token: string) {
    const payload = jwt.verify(token, secret_key);
    return payload;
} 

export const authService = {
    login,
    signJWT,
    verifyJWT
};

export default authService;