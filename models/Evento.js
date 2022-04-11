const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
    
    title:{
        type: String,
        required: true
    },
    notes:{
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    
});

EventoSchema.method('toJSON', function() {
    const { __v,_id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = mongoose.model('Evento', EventoSchema);