const mysql = require("mysql2")


function crearPautaEncuestaPool(pool, callback, data){
    let insertarJsonPreguntas = "UPDATE estudios SET preguntas = ? WHERE codEstudio = ?;";
    let arrayData = [JSON.stringify({preguntas:data.preguntas}),data.codEstudio];

    queryConData(insertarJsonPreguntas,pool,callback,arrayData);
}

 function subirCsvPool(pool, data, callback){
    let codEstudio =  data[0].codEstudio;
    let insertarJsonPreguntas = "UPDATE estudios SET DbPreguntas = ? WHERE codEstudio = ?;";
    let arrayData =  [JSON.stringify({DbPreguntas:data.data}),codEstudio];

    queryConData(insertarJsonPreguntas,pool,callback,arrayData);
}


function listarEstudioPorIdPool(pool, callback, data){
    let listarEstudioPorId = "Select * from estudios where codEstudio = ?";
    let arrayData = [data]
    queryConData(listarEstudioPorId,pool,callback,arrayData);
}
function listarEstudioPool(pool, callback) {
    let listarEncuestasQuery = "Select codEstudio,nombreEstudio from estudios";
    querySinData(listarEncuestasQuery, pool, callback);
}

function agregarEstudioPool(pool, data, callback) {

    let agregarEstudioQuery = "insert into estudios (codEstudio,supervisor,nombreEstudio,fechaInicio,fechaTermino,porcentajeTeoricoEstudio,tipoSupervision,metodo,duracionPromedioEncuesta,duracionMinima,muestraTotal) values (?,?,?,?,?,?,?,?,?,?,?)"
    let arrayData = [data.codEstudio,data.rutSupervisor, data.nombreEstudio, data.fechaInicio, data.fechaTermino, data.porcentajeTeoricoEstudio, data.tipoSupervision, data.metodo, data.duracionPromedioEncuesta, data.duracionMinima, data.muestraTotal]

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
    let insertQuery = "insert into usuarios (rut,usuario,pass,nombre,email,telefono,tipo) values(?,?,?,?,?,?,?)"
    let arrayData = [ data.rut,data.usuario, data.pass, data.nombre, data.email, data.telefono, data.tipo]
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
    console.log(query)
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
    listarEstudioPorIdPool,
    crearPautaEncuestaPool,
    subirCsvPool
}