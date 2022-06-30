var mysql = require('mysql2');
const {databaseInfo} = require('./keyDatabase')
const {insertUsuarioPool,
    comprobarExistenciaUsuarioPool,
    tipoUsuarioPool,
    agregarEstudioPool,
    listarEstudioPool,
    listarEstudioPorIdPool,
    crearPautaEncuestaPool,
    subirCsvPool
} = require('./connectionPool')

var pool = mysql.createPool(databaseInfo);
 function subirCsvBd(data,callback){
    subirCsvPool(pool,data,callback)
}
function crearPautaEncuestaDb(data,callback){
    crearPautaEncuestaPool(pool,callback,data);
}
function listarEstudioPorId(data,callback){
    listarEstudioPorIdPool(pool,data,callback,);
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

function insertUsuarioBd(data,callback){
    insertUsuarioPool(pool,data,callback);
}


module.exports = {
    insertUsuarioBd,
    comprobarExistenciaUsuario,
    tipoUsuario,
    agregarEstudio,
    listarEstudio,
    listarEstudioPorId,
    crearPautaEncuestaDb,
    subirCsvBd
}