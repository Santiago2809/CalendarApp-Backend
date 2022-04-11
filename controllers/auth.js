const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generateJWT } = require('../helpers/jwt');


const registerUser = async (req, res = response) => {
    
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        // Comprobar que no exista un usuario con el correo provisto
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo electronico'
            });
        };
        //Creacion del usuario con los datos provistos
        usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        
        //Guardar el usuario en la base de datos
        await usuario.save();
    
        //Generar el JWT
        const token = await generateJWT( usuario.id, usuario.name );
        

        //Enviar la respuesta de que todo salió bien
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })    
    };
    
};

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        // Comprobar que exista un usuario con el correo provisto
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese email'
            })    
            
            
        }
        //Comprobar contraseña
        const validPassword = bcrypt.compareSync( password, usuario.password)
        
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        };

        //Generar el JWT
        const token = await generateJWT( usuario.id, usuario.name );

        //Enviar la respuesta de que todo salió bien
        res.status(200).json({
            ok: true,
            msg: 'login',
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch(error) {
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        }) 
    };
    
};

const reNewToken =  async (req, res = response) => {

    const { uid, name } = req;

    // Generar nuevo token 
    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        token
    })

};
module.exports = {
    // registerUser: registerUser
    registerUser,
    loginUser,
    reNewToken

}