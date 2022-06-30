var express = require('express');
var router = express.Router();
const {
    nuevaEncuesta,
    listarEncuestas,
    listarEstudioPorIdController,
    crearPautaEncuesta,
    subirCvsController
} = require('./controller');

const validarSesion = require('./../../middleware/comprobarSesion');



router.post('/agregarEstudio',nuevaEncuesta);
router.post('/crearPautaEncuesta',crearPautaEncuesta);
router.get('/listarEstudios',listarEncuestas);
router.get('/listarEstudios/:id',listarEstudioPorIdController);
router.post('/subirCvs',subirCvsController)
module.exports = router