const {Schema,model} = require('mongoose');

// Crear el esquema de la base de datos de mensajes
const MessageSchema = Schema({
    // Definir los campos de la base de datos
    from:{
        type: Schema.Types.ObjectId,
        ref : 'Usuario',
        required: true
    },
    to:{
        type: Schema.Types.ObjectId,
        ref : 'Usuario',
        required: true
    },
    message:{
        type: String,
        required: true
    }

},{
    timestamps: true,
 
});


MessageSchema.method('toJSON',function(){
    const {__v,_id,...object} = this.toObject();
    return object;
});

// Exportar el modelo
module.exports = model('Message',MessageSchema);