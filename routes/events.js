/*

    Rutas de Eventos
    host + /api/events

*/

const express = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = express.Router();

// Todas las rutas necesitan validar el JWT
router.use( validarJWT ); // esto hace que todas las rutas usen este middleware, asi no lo incluimos y repetimos en cada una de las rutas

//CRUD de eventos (create, read, update, delete)

// Obtener un evento - read
router.get('/', getEvento);

// Crear un nuevo evento - create
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start','La fehca de inicio es obligatoria').custom( isDate ),
        check('end','La fehca de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento);

// Actualizar un evento - update 
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start','La fehca de inicio es obligatoria').custom( isDate ),
        check('end','La fehca de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento);

// Eliminar un evento - delete
router.delete('/:id', eliminarEvento);



module.exports = router;
