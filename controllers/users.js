const { Response } = require('express');
const Usuario = require('../models/usuario');

//  Get users from DB
const getUsers = async (req, res = Response) => {

    const from = Number(req.query.from) || 0;


    // Get all users from DB and sort them by online status 
    const usuarios = await Usuario
    // Exclude the current user from the list
        .find({_id:{$ne:(req.uid)}})
        // Sort by online status
        .sort('-online')
        // Skip the first 'from' users
        .skip(from)
        // Limit the number of users to 20
        .limit(20)

    // Return all users from DB
        res.json({
            ok: true,
            usuarios
        });


};

module.exports = {getUsers};