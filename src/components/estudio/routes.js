var express = require('express');
var router = express.Router();
const {nuevaEncuesta} = require('./controller')
const validarSesion = require('./../../middleware/comprobarSesion')

router.post('/agregarEstudio',validarSesion,nuevaEncuesta);

module.exports = router