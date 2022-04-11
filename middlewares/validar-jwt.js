const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req = request, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    // Validaciones de si existe un token para saber autenticaciones
    if ( !token ) {
        res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    };

    try {
      
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    };

    next();
};


module.exports = {
    validarJWT
}