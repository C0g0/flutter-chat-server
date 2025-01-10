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

module.exports = {  generarJWT  };