import jwt from 'jsonwebtoken';
import 'dotenv/config';

const defaultUser = {
    user: "ASdev",
    email:"asmuela.dev@gmail.com",
    password: 'ASdev12345'
};

const secret_key: string = process.env.SECRET_KEY || '';

async function login(user: string, password: string, email: string) {
    if(user === defaultUser.user && password === defaultUser.password) {
        const result = signJWT({user, email}) 
        return result;
    }
    throw new Error('Error al logear');
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