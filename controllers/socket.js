const Usuario = require('../models/usuario');
const Message = require('../models/message')

const userConnected = async (uid = '') => {

    // Buscar el usuario por el id
    const usuario = await Usuario.findById(uid);

    // Cambiar el estado del usuario a conectado
    usuario.online = true;

    // Guardar el usuario en la base de datos
    await usuario.save();

    // Retornar el usuario conectado
    return usuario;
}

const userDisconnected = async (uid = '') => {

    // Buscar el usuario por el id
    const usuario = await Usuario.findById(uid);

    // Cambiar el estado del usuario a desconectado
    usuario.online = false;

    // Guardar el usuario en la base de datos
    await usuario.save();

    // Retornar el usuario desconectado
    return usuario;
}

const recordMessage = async (payload ) => {

    /* 
        {
            from: '',
            to: '',
            message: ''
        }
    */
    try {
        const message = Message(payload);
        await message.save();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = { userConnected, userDisconnected,recordMessage };