const Message = require('../models/message');

const getMessages = async (req,res) => {
    const myId =req.uid;
    // obtener el parametro enviado en la request
    const messagesFrom = req.params.from;

    // obtener los mensajes enviados por mi a messagesFrom y los mensajes enviads de messagesFrom a mi
    const last30 = await Message.find({
        $or:[{from:myId,to:messagesFrom},{from:messagesFrom,to:myId}]
    }).sort({createdAt:'desc'})
    .limit(30);

    res.json({
        ok: true,
        messages:last30
    })
}

module.exports = {getMessages};