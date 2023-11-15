import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import 'dotenv/config';
import { UsersModel } from '../models/users.model';

const secret_key: string = process.env.SECRET_KEY || '';

async function login(password: string, email: string) {
    
    const resultFindUser = await UsersModel.findOne({email: email});
    
    if(!resultFindUser) throw new Error('User not found');

    const user: string = resultFindUser.name;
    const userPhoto: string = resultFindUser.photo || '';
    
    const passwordOk = await bcrypt.compare(password, resultFindUser.password_hash || ''); 
    
    if(!passwordOk) throw new Error('Something went wrong. Email or Password Incorrect');

    return signJWT({user, email, userPhoto});
}

function signJWT(payload: { user: string, email: string, userPhoto: string }) {
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