const mysql = require("mysql")

function tipoUsuarioPool(pool,data,callback){

    let comprobarExistenciaUsuarioQuery = "select tipo from usuarios where usuario = ?"
    let query = mysql.format(comprobarExistenciaUsuarioQuery,[data]);

    pool.getConnection(function(err,connection){
        if(err){
            console.log("error en la base de datos");
        };
        connection.query(query,function(err,result){
            callback(result,err)
            connection.release()
        })
    })
}
function comprobarExistenciaUsuarioPool(pool,data,callback){
    let comprobarExistenciaUsuarioQuery = "select count(*) as cantidadUsuarios from usuarios where usuario = ? and pass = ?"
    let query = mysql.format(comprobarExistenciaUsuarioQuery,[data.usuario,data.pass]);
    pool.getConnection(function(err,connection){
        if(err){
            console.log("error en la base de datos");
        };
        connection.query(query,function(err,result){
            callback(result,err)
            connection.release()
        })
    })
}

function insertUsuarioPool(pool,data,callback){
    let insertQuery = "insert into usuarios (usuario,pass,nombre,rut,email,telefono,tipo) values(?,?,?,?,?,?,?)"
    let query = mysql.format(insertQuery,[data.usuario,data.pass,data.nombre,data.rut,data.email,data.telefono,data.tipo]);
    pool.getConnection(function(err,connection){
        if(err){
            console.log(1)
        };
        connection.query(query,function(err,result){
            callback(result,err)
            connection.release()
        })
    })
}

module.exports = {
    insertUsuarioPool,
    comprobarExistenciaUsuarioPool,
    tipoUsuarioPool
}