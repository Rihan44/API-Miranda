import jwt from 'jsonwebtoken';
import 'dotenv/config';

const defaultUser = {
    user: "ASdev",
    password: "12345",
};

const secret_key: string = process.env.SECRET_KEY || '';

async function login(user: string, password: string) {
    if(user === defaultUser.user && password === defaultUser.password) {
        const result = await signJWT({user}) 
        return result;
    }
    throw new Error('Error al logear');
}
function signJWT(payload: { user: string }) {
    const token = jwt.sign(payload, secret_key, {expiresIn: '1h'});
    return {payload, token};
}
function verifyJWT(token: string) {
    jwt.verify(token, secret_key, (err, token) => {
        if(err) 
            throw new Error('El token no es el mismo, espabila');
        return token;
    })
} 

export const authService = {
    login,
    signJWT,
    verifyJWT
};

export default authService;