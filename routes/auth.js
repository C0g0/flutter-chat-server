/*
    path: /api/login
*/

const {Router,response} = require('express');
const { crearUsuario } = require('../controllers/auth');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { loginUsuario } = require('../controllers/auth');
const { renewToken } = require('../controllers/auth');
const { valirdarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new',[
    check('name','El nombre es obligatorio').trim().notEmpty(),
    check('password','La contraseña debe contener minimo 6 carácteres').trim().notEmpty().isLength({min:6}),
    check('email','El email es obligatorio').trim().isEmail(),
    validarCampos,
],crearUsuario)

router.post('/',[
    check('password','La contraseña debe contener minimo 6 carácteres').trim().notEmpty().isLength({min:6}),
    check('email','El email es obligatorio').trim().isEmail(),
    validarCampos,
],loginUsuario)

router.get('/renew',valirdarJWT,renewToken)

module.exports = router;