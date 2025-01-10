const jwt = require('jsonwebtoken');

// Valida si el token es correcto
const valirdarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    try {

        const {uid} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
        
    }

    
};

module.exports = {valirdarJWT};