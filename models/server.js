const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';


        //middlewares
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
    }

    middlewares() {
           //cors
        this.app.use( cors());

        //lectura y parse del body
        this.app.use(express.json());

         //directorio publico
        this.app.use(express.static('public'));

    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }


    listen() {
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en puerto', this.port);
    });

  }


}



module.exports=Server;