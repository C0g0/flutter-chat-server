const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise(async (resolve, reject) => {
        // Payload
        const payload = { uid };

        // Generar el token
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '12h',
    
        },( err, token ) => {
            if(err){
                reject('No se pudo generar el token');
            }else{

                resolve(token);
            }
        }); 
    });
};

const testJWT = (token = '') => { 
    try {
        const {uid} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        return [true,uid];
    } catch (error) {
        return [false,null];
        
    }}

module.exports = {  generarJWT ,testJWT };