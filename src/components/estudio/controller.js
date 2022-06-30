
let csv = require('csv-parser');
const fs = require('fs');
const fastcsv = require("fast-csv");
const mysql = require("mysql2")
const {
  agregarEstudio,
  listarEstudio,
  listarEstudioPorId,
  crearPautaEncuestaDb,
  subirCsvBd } = require('./../../database/connectionConfig');


function nuevaEncuesta(req, res) {
  const {
    codEstudio,
    nombreEstudio,
    fechaInicio,
    fechaTermino,
    rutSupervisor,
    porcentajeTeoricoEstudio,
    tipoSupervision,
    metodo,
    duracionPromedioEncuesta,
    duracionMinima,
    muestraTotal,
    baseDeDatos,
    pautaEncuesta
  } = req.body;
  let data = {
    codEstudio: codEstudio,
    nombreEstudio: nombreEstudio,
    fechaInicio: fechaInicio,
    rutSupervisor: rutSupervisor,
    fechaTermino: fechaTermino,
    porcentajeTeoricoEstudio: porcentajeTeoricoEstudio,
    tipoSupervision: tipoSupervision,
    metodo: metodo,
    duracionPromedioEncuesta: duracionPromedioEncuesta,
    duracionMinima: duracionMinima,
    muestraTotal: muestraTotal,
    baseDeDatos: baseDeDatos,
    pautaEncuesta: pautaEncuesta
  };
  agregarEstudio(data, (result, err) => {
    if (err && err.code == "ER_DUP_ENTRY") {
      res.status(409).json({ message: "Estudio duplicado" });
    } else {
      console.log(err)
      res.status(201).json({ message: "Estudio registrado exitosamente!" });
    }
  });

}

function listarEncuestas(req, res) {
  listarEstudio((result, err) => {
    if (err) {
      res.status(500).json({ message: "Erro en la base de datos" });
    } else {
      res.status(200).json(result);
    }
  });

}
function listarEstudioPorIdController(req, res) {
  const { id } = req.params;
  listarEstudioPorId(id, (result, err) => {
    if (err) {
      res.status(500).json({ message: "Erro en la base de datos" });
    } else {
      res.status(200).json(result);
    }
  })
}

function crearPautaEncuesta(req, res) {
  const { codEstudio, preguntas } = req.body;
  let data = {
    codEstudio,
    preguntas
  }
  crearPautaEncuestaDb(data, (result, err) => {
    if (err && err.code == "ER_DUP_ENTRY") {
      res.status(409).json({ message: "Estudio duplicado" });
    } else {
      console.log(err)
      res.status(201).json({ message: "Estudio registrado exitosamente!" });
    }
  })

}

function subirCvsController(req, res) {
  const file = req.files;
  console.log(file)

  file.data.mv(__dirname + file.data.tempFilePath)

  let results = [];

  fs.createReadStream(__dirname + file.data.tempFilePath)
    .pipe(csv(';'))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      let data = results
      console.log(results)
      var connect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "monona",
        database: "datavoz"
      });
      let consulta = "UPDATE estudios SET DbPreguntas = ? WHERE codEstudio = ?;";
      let query = mysql.format(consulta, [JSON.stringify({ DbPreguntas: data }), data[0].Cod_estudio]);
      // console.log(query)
      connect.query(query,function (error, results, fields) {
        if (error) throw error;
        console.log(results)
      })
    });

}






module.exports = {
  nuevaEncuesta,
  listarEncuestas,
  listarEstudioPorIdController,
  crearPautaEncuesta,
  subirCvsController

}