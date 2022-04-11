/*

    Rutas de Usuarios / Auth
    host + api/auth

*/ 
const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { registerUser, loginUser, reNewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();


// Crear un usuario
router.post(
    '/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser por lo menos de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    registerUser 
);

// Login de un usuario
router.post(
    '/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser por lo menos de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUser 
);

// Renovar el token
// router.get(
//     '/renew',
//     [
//         validarJWT
//     ],
//     reNewToken 
// );
router.get('/renew', validarJWT , reNewToken);









module.exports = router;