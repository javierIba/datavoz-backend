const {agregarEstudio} = require('./../../database/connectionConfig')

function nuevaEncuesta(req,res){
    const {
        codEstudio,
        nombreEstudio,
        fechaInicio  ,
        fechaTermino  ,
        porcentajeTeoricoEstudio  ,
        tipoSupervision  ,
        metodo  ,
        duracionPromedioEncuesta  ,
        duracionMinima  ,
        muestraTotal  
    } = req.body;
    let data = {
        codEstudio: codEstudio,
        nombreEstudio: nombreEstudio,
        fechaInicio: fechaInicio,
        fechaTermino:fechaTermino ,
        porcentajeTeoricoEstudio: porcentajeTeoricoEstudio,
        tipoSupervision: tipoSupervision,
        metodo: metodo,
        duracionPromedioEncuesta:duracionPromedioEncuesta ,
        duracionMinima:duracionMinima ,
        muestraTotal: muestraTotal
    };
    agregarEstudio(data, (result, err) => {
        if (err && err.code == "ER_DUP_ENTRY") {
          res.status(409).json({message:"Estudio duplicado"});
        } else {
          res.status(201).json({message:"Estudio registrado exitosamente!"});
        }
      });

}
module.exports = {nuevaEncuesta}