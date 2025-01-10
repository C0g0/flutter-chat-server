const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    // Obtener el email del body
    const { email,password} = req.body;

    try {
        // Verificar si existe el email
        const existeEmail = await Usuario.findOne({email:email});

        // Si existe el email
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no validas por favor verifique'
            });
        }
        // Crear un nuevo usuario
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Generar mi JWT
        const token = await generarJWT(usuario.id);

        // Guardar el usuario en la base de datos
        await usuario.save();

        // Respuesta exitosa
        res.json({
        ok: true,
        usuario,
        token
    });
    } catch (error) {
        // Error en el servidor
        console.log(error);
        // Respuesta de error
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

    
};

const loginUsuario = async (req, res = response) => {
    const { email,password} = req.body;
    try {
        // Verificar si existe el email
        const usuarioDB = await Usuario.findOne({email:email});

        // Si no existe el email
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales no validas por favor verifique'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no validas por favor verifique'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuarioDB.id);

        // Respuesta exitosa
        res.json({
            ok: true,
            usuarioDB,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const renewToken = async (req, res = response) => {
    // Obtener el uid
    const uid = req.uid;

    // Generar un nuevo JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por el uid
    const usuarioDB = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuarioDB,
        token
    });
};

module.exports = {crearUsuario,loginUsuario,renewToken};