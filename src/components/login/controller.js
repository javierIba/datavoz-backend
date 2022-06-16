
const { insertUsuarioBd,comprobarExistenciaUsuario,tipoUsuario } = require('./../../database/connectionConfig')
const jwt = require('jsonwebtoken');


function observadorEstadoLoginUsuario(req,res){
  let token = ''
  if(req.header('auth'))token = req.header('auth')
  if(!token){
      res.status(403).send({message:"Sesión expirada"})
  }else{
      jwt.verify(token,'datavozJEJE',(err,data)=>{
          if(err){
              res.status(403).json({message:"Token invalido"});
          }else{

          tipoUsuario(data,(result,err)=>{
            if(err){
              res.status(403).json({message:"Token invalido"});
            } else{
              res.status(200).json({
                message:"Token valido",
                estado:true,
                tipo:result[0].tipo
            })
            }

          })
             
          }
      })
    
  }
  


}
function login(req,res){
    const { usuario, pass } = req.body;
    const data = {
      usuario: usuario,
      pass: pass
    };
    comprobarExistenciaUsuario(data,(result,err)=>{
        const {cantidadUsuarios} = result[0]; 
        if(cantidadUsuarios>0){
            
            token = jwt.sign(usuario,'datavozJEJE')
            res.status(200).json({message:"autenticado rei",token:token})
        }else{
            // res.status(403).json("El usuario o la contraseña se encuentran mal escritas")
            res.status(403).json({message:"N0 por pel0n"})
        }
    })


}
/*poner middelwar de autenticacion de usuario

lkadsl}kñdasklñjas}dñklasd
dsa
das
dsa
dsa
asd
das
dsalñjkda{sjñkasd
sdañlkasd}
*/
function insertUsuario(req, res){
    const { usuario, pass, nombre,rut,email,telefono } = req.body;
    const data = {
      usuario: usuario,
      pass: pass,
      nombre:nombre,
      rut:rut,
      email:email,
      telefono:telefono,
      tipo:2
    };
  
    insertUsuarioBd(data, (result, err) => {
      if (err && err.code == "ER_DUP_ENTRY") {
        res.status(409).json("Usuario duplicado");
      } else {
        res.status(201).json("Usuario registrado exitosamente!");
      }
    });
  }



module.exports = {insertUsuario,login,observadorEstadoLoginUsuario}