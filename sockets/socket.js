const {io} = require('../index');
const {testJWT} = require('../helpers/jwt');
const {userConnected,userDisconnected,recordMessage} = require('../controllers/socket');
const usuario = require('../models/usuario');

//Mensajes de Sockets
io.on('connection',client =>{
    console.log('Cliente conectado');

    // comprobar token  del socket  
    const[valido,uid] = testJWT(client.handshake.headers['x-token']);

    // verificar autenticacion
    if (!valido) {
        return client.disconnect();}

    // cliente autenticado
    userConnected(uid);

    // Ingresar al usuario a una sala global con el uid del client
    client.join(uid);

    // Recibir notificaciones de la sala global
    client.on('personal-message', async (payload)=>{
        await recordMessage(payload);
        io.to(payload.to).emit('personal-message', payload)
    })

    // desconexion del cliente
    client.on('disconnect',() => {
        userDisconnected(uid);
    }); 

    // escuchar mensaje del cliente
    client.on('message',(payload) => {
        console.log('Nuevo mensaje:',payload);
        client.emit('message',{admin: 'Mensaje del admin'});
    });
});