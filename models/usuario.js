const {Schema,model} = require('mongoose');

// Crear el esquema de la base de datos
const UsuarioSchema = Schema({
    // Definir los campos de la base de datos
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    online:{
        type: Boolean,
        default: false
    }

});

// Cambiar el nombre de _id por uid
UsuarioSchema.method('toJSON',function(){
    const {__v,_id,password,...object} = this.toObject();
    object.uid = _id;
    return object;
});

// Exportar el modelo
module.exports = model('Usuario',UsuarioSchema);