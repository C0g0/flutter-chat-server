/*
    path: /api/messages
*/

const {Router,response} = require('express');
const { valirdarJWT } = require('../middlewares/validar-jwt');
const {getMessages} = require ('../controllers/messages');


const router = Router();

router.get('/:from',valirdarJWT,getMessages)

module.exports = router;