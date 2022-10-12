const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const usuariosGet= async(req = Request, res = response) => {

    const {limite = 5, desde= 0} = req.query;
    const query = {estado:true};
    //const usuarios = await Usuario.find({estado:true})
      //  .skip(Number(desde))
        //.limit(Number(limite));

    //const total = await Usuario.countDocuments({estado:true});

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res.json({
      total, usuarios });
}

const usuariosPost= async (req, res) => {
  
    

  const {nombre, correo, password, rol } = req.body;
  const usuario = new Usuario( {nombre, correo, password, rol});

  //verificar si el correo existe
    
  //encriptar la contraseña
  const salt= bcrypt.genSaltSync();
  usuario.password= bcrypt.hashSync(password, salt);
  //guardar en BD
  await usuario.save();


  res.json({
    
    usuario
  });
}


const usuariosPut= async (req, res = response) => {

    const {id} = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //todo validar contra base de datos
    if ( password ){

      const salt= bcrypt.genSaltSync();
      resto.password= bcrypt.hashSync(password, salt);
      

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json(usuario);
}

const usuariosPatch= (req, res) => {

    res.json({
      msg: 'patch Api - controlador'  
    });
}


const usuariosDelete= async(req, res= response) => {

  const { id } = req.params;

  //fisicamente lo borramos
  //const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});


    res.json({
      usuario
    
      
    });
}






 module.exports= {
    usuariosGet,
    usuariosPut,
    usuariosPatch,
    usuariosPost,
    usuariosDelete

 }