var express = require('express');
var router = express.Router();
const {insertUsuario,login,observadorEstadoLoginUsuario} = require('./controller')


router.post('/login',login);

router.get('/insert', insertUsuario)
router.get('/observarEstado',observadorEstadoLoginUsuario);


module.exports = router;