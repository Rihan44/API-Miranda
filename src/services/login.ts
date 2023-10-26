import jwt from 'jsonwebtoken';
import 'dotenv/config';

const defaultUser = {
    user: "asmuela.dev@gmail.com",
    password: "12345",
};

const secret_key: string = process.env.SECRET_KEY || '';

async function login(user: string, pass: string) {
    if(user === defaultUser.user && pass === defaultUser.password)
        signJWT({user})
    throw new Error('Error al logear');
}

function signJWT(payload: { user: string }) {
    const token = jwt.sign(payload, secret_key, {expiresIn: '1h'});
    return token;
}

function verifyJWT(token: string) {
    // Verify the jwt token
}

export const authService = {
    login,
    signJWT,
    verifyJWT,
};

export default authService;