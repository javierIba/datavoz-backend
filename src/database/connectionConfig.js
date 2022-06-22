var mysql = require('mysql');
const {databaseInfo} = require('./keyDatabase')
const {insertUsuarioPool,
    comprobarExistenciaUsuarioPool,
    tipoUsuarioPool,
    agregarEstudioPool,
    listarEstudioPool,
    listarEstudioPorIdPool} = require('./connectionPool')

var pool = mysql.createPool(databaseInfo);
function listarEstudioPorId(data,callback){
    listarEstudioPorIdPool(pool,callback,data);
}
function listarEstudio(callback){
    listarEstudioPool(pool,callback)
}
function agregarEstudio(data,callback){
    agregarEstudioPool(pool,data,callback)
}
function tipoUsuario(data,callback){
    tipoUsuarioPool(pool,data,callback);
}
function comprobarExistenciaUsuario(data,callback){
    comprobarExistenciaUsuarioPool(pool,data,callback);
}

function insertUsuarioBd(callback){
    insertUsuarioPool(pool,data,callback);
}


module.exports = {
    insertUsuarioBd,
    comprobarExistenciaUsuario,
    tipoUsuario,
    agregarEstudio,
    listarEstudio,
    listarEstudioPorId
}