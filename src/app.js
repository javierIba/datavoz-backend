var express = require('express');
var router = express.Router();
const login = require('./components/login/routes');
const estudio = require('./components/estudio/routes')
router.use('/estudio',estudio)
router.use(login);

module.exports = router;