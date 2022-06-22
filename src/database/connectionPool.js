const mysql = require("mysql")

function listarEstudioPorIdPool(pool, callback, data){
    let listarEstudioPorId = "Select * from estudio where codEstudio = ?";
    let arrayData = [data]
    queryConData(listarEstudioPorId,pool,callback,arrayData);
}
function listarEstudioPool(pool, callback) {
    let listarEncuestasQuery = "Select codEstudio,nombreEstudio,baseDeDatos,pautaEncuesta from estudio";
    querySinData(listarEncuestasQuery, pool, callback);
}

function agregarEstudioPool(pool, data, callback) {
    let agregarEstudioQuery = "insert into estudio (codEstudio,nombreEstudio,fechaInicio,fechaTermino,porcentajeTeoricoEstudio,tipoSupervision,metodo,duracionPromedioEncuesta,duracionMinima,muestraTotal,baseDeDatos,pautaEncuesta) values (?,?,?,?,?,?,?,?,?,?,?,?)"
    let arrayData = [data.codEstudio, data.nombreEstudio, data.fechaInicio, data.fechaTermino, data.porcentajeTeoricoEstudio, data.tipoSupervision, data.metodo, data.duracionPromedioEncuesta, data.duracionMinima, data.muestraTotal, data.baseDeDatos, data.pautaEncuesta]
    queryConData(agregarEstudioQuery, pool, callback, arrayData)
}
function tipoUsuarioPool(pool, data, callback) {

    let comprobarExistenciaUsuarioQuery = "select tipo from usuarios where usuario = ?"
    let query = mysql.format(comprobarExistenciaUsuarioQuery, [data]);

    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("error en la base de datos");
        };
        connection.query(query, function (err, result) {
            callback(result, err)
            connection.release()
        })
    })
}
function comprobarExistenciaUsuarioPool(pool, data, callback) {
    let comprobarExistenciaUsuarioQuery = "select count(*) as cantidadUsuarios from usuarios where usuario = ? and pass = ?"
    let query = mysql.format(comprobarExistenciaUsuarioQuery, [data.usuario, data.pass]);
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("error en la base de datos");
        };
        connection.query(query, function (err, result) {
            callback(result, err)
            connection.release()
        })
    })
}

function insertUsuarioPool(pool, data, callback) {
    let insertQuery = "insert into usuarios (usuario,pass,nombre,rut,email,telefono,tipo) values(?,?,?,?,?,?,?)"
    let arrayData = [data.usuario, data.pass, data.nombre, data.rut, data.email, data.telefono, data.tipo]
    queryConData(insertQuery, pool, callback,arrayData)
}




function querySinData(consulta, pool, callback) {
    let query = mysql.format(consulta);
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("error en la base de datos");
        };
        connection.query(query, function (err, result) {
            callback(result, err)
            connection.release()
        })
    })
}
function queryConData(consulta, pool, callback, array) {
    let query = mysql.format(consulta, array);
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("error en la base de datos");
        };
        connection.query(query, function (err, result) {
            callback(result, err)
            connection.release()
        })
    })
}
module.exports = {
    insertUsuarioPool,
    comprobarExistenciaUsuarioPool,
    tipoUsuarioPool,
    agregarEstudioPool,
    listarEstudioPool,
    listarEstudioPorIdPool
}