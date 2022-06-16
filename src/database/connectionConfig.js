var mysql = require('mysql');
const {databaseInfo} = require('./keyDatabase')
const {insertUsuarioPool,comprobarExistenciaUsuarioPool,tipoUsuarioPool} = require('./connectionPool')

var pool = mysql.createPool(databaseInfo);

function tipoUsuario(data,callback){
    tipoUsuarioPool(pool,data,callback);
}
function comprobarExistenciaUsuario(data,callback){
    comprobarExistenciaUsuarioPool(pool,data,callback);
}

function insertUsuarioBd(data,callback){
    insertUsuarioPool(pool,data,callback);
}


module.exports = {
    insertUsuarioBd,
    comprobarExistenciaUsuario,
    tipoUsuario
}