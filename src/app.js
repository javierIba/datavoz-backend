var express = require('express');
var router = express.Router();
const login = require('./components/login/routes');

router.use(login);

module.exports = router;