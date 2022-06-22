var express = require('express');
var router = express.Router();
const {nuevaEncuesta,listarEncuestas,listarEstudioPorIdController} = require('./controller')
const validarSesion = require('./../../middleware/comprobarSesion')

router.post('/agregarEstudio',validarSesion,nuevaEncuesta);
router.get('/listarEstudios',listarEncuestas)
router.get('/listarEstudios/:id',listarEstudioPorIdController)
module.exports = router