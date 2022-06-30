var mysql = require('mysql2');
const {databaseInfo} = require('./keyDatabase')
const {insertUsuarioPool,
    comprobarExistenciaUsuarioPool,
    tipoUsuarioPool,
    agregarEstudioPool,
    listarEstudioPool,
    listarEstudioPorIdPool,
    crearPautaEncuestaPool} = require('./connectionPool')

var pool = mysql.createPool(databaseInfo);

function crearPautaEncuestaDb(data,callback){
    crearPautaEncuestaPool(pool,callback,data);
}
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
    crearPautaEncuestaDb
}