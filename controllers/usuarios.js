const { response } = require('express');


const usuariosGet= (req = Request, res = response) => {

    const query = req.query;

    res.json({
      msg: 'get Api - controlador',
      query  
    });
}

const usuariosPut= (req, res = response) => {

    const id = req.params.id;


    res.json({
      msg: 'put Api - controlador',
      id  
    });
}

const usuariosPatch= (req, res) => {

    res.json({
      msg: 'patch Api - controlador'  
    });
}
const usuariosPost= (req, res) => {

    const body = req.body;

    res.json({
      msg: 'post Api - controlador' ,
      body 
    });
}

const usuariosDelete= (req, res) => {

    res.json({
      msg: 'delete Api - controlador'  
    });
}






 module.exports= {
    usuariosGet,
    usuariosPut,
    usuariosPatch,
    usuariosPost,
    usuariosDelete

 }