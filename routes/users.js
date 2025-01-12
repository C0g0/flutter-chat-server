/*
    path: /api/users
*/

const {Router,response} = require('express');
const { valirdarJWT } = require('../middlewares/validar-jwt');
const { getUsers } = require('../controllers/users');


const router = Router();

router.get('/',valirdarJWT,getUsers)

module.exports = router;