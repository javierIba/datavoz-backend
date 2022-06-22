const { agregarEstudio, listarEstudio, listarEstudioPorId } = require('./../../database/connectionConfig')

function nuevaEncuesta(req, res) {
  const {
    codEstudio,
    nombreEstudio,
    fechaInicio,
    fechaTermino,
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
  listarEstudioPorId(id,(result,err)=>{
    if (err) {
      res.status(500).json({ message: "Erro en la base de datos" });
    } else {
      res.status(200).json(result);
    }
  })
}
module.exports = {
  nuevaEncuesta,
  listarEncuestas,
  listarEstudioPorIdController

}