const express = require('express');
const cors    = require('cors');

class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        
        this.usuariosPath       = '/api/usuarios';
        this.usuariosRequire   = '../routes/user';

        // Middlewares
        this.middelwares();
        // Rutas de mi aplicacion
        this.routes();
    }

    middelwares(){

        // CORS        
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static( 'public' ) );
    }

    routes() {
        this.app.use( this.usuariosPath,require( this.usuariosRequire ) );
    }

    listen(){
        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en el puerto ', this.port )
        } );
    }

}

module.exports = Server;