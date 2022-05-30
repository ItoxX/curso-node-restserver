const { response } = require('express');
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');

const UsuariosGet = async(req, res = response) => {

    const { limite = 5,desde = 0 } = req.query;
    //Argumentos opcionales
    const query = { estado:true };

    /*
    const usuarios  = await Usuario.find( query )
                    .limit( Number( limite ) )
                    .skip( Number ( desde ));

    const total     = await Usuario.countDocuments( query );
    */
    const [ total,usuarios ] = await Promise.all( [ 
        Usuario.countDocuments( query ),
        Usuario.find( query )
                    .limit( Number( limite ) )
                    .skip( Number ( desde ))
    ] );

    res.json({
        //resp        
        total,
        usuarios        
    })

};

const UsuariosPost = async(req,res = response) => {

    //const { nombre,edad } = req.body;
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync( password,salt );

    // Guardar en DB
    await usuario.save();

    res.json({
        msg: 'POST API - usuariosPost',
        usuario
    });
}

const UsuariosPut = async(req,res = response) => {

    const { id } = req.params;

    const { __id,password,google,correo,...resto } = req.body;

    // TODO validad contra base de datos

    if( password ){
         // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); 
        resto.password = bcryptjs.hashSync( password,salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id,resto );

    res.json({
        usuario
    });

}

const UsuariosPatch = ('/',(req,res = response) => {
    res.json({
        msg: 'PATCH API - controlador'
    });
})

const UsuariosDelete = async(req,res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json( usuario );
};

module.exports = {
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosPatch,
    UsuariosDelete
}