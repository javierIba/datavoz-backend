var express = require('express');
var router = express.Router();
const {insertUsuario,login,observadorEstadoLoginUsuario} = require('./controller')
const validarSesion = require('./../../middleware/comprobarSesion')


router.post('/login',login);

router.post('/insert',validarSesion, insertUsuario)
router.get('/observarEstado',observadorEstadoLoginUsuario);


module.exports = router;