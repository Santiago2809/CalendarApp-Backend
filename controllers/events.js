const { response } = require('express');
const Evento = require('../models/Evento');



const getEvento = async( req, res = response ) => {


    try {
        const eventos = await Evento.find().populate('usuario', 'name');
    
        return res.status(200).json({
            ok: true,
            eventos
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    }
    
    

    
};

const crearEvento = async ( req, res = response ) => {

    // console.log( req.body );
    const evento = new Evento( req.body );

    try {

        evento.usuario = req.uid; 

        const eventoDB = await evento.save();

        res.status(200).json({
            ok: true,
            evento: eventoDB
        });
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        })
    }
}

const actualizarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id'
            })
        };

        if( evento.usuario.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            usuario: req.uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { returnDocument: 'after'});

        return res.status(201).json({
            ok: true,
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    }
}

const eliminarEvento = async ( req, res = response ) => {
    
    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id'
            });

        };
        if( evento.usuario.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este evento'
            });
        };
        await Evento.findByIdAndDelete( eventoId );
    
        return res.status(200).json({
            ok: true,
            msg: 'Evento eliminado'
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    }
}

module.exports = {
    getEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}