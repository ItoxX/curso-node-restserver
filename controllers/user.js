const { response } = require('express');

const UsuariosGet = ('/', (req, res = response) => {

    const { q,nombre = 'No name',apikey,page = "1",limit } = req.query;

    res.json({
        msg: 'GET API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
});

const UsuariosPost = ('/',(req,res = response) => {

    const { nombre,edad } = req.body;

    res.json({
        msg: 'POST API - controlador',
        nombre,
        edad
    });
})

const UsuariosPut = ('/',(req,res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'PUT API - controlador',
        id
    });

})

const UsuariosPatch = ('/',(req,res = response) => {
    res.json({
        msg: 'PATCH API - controlador'
    });
})

const UsuariosDelete = ('/',(req,res = response) => {


    res.json({
        msg: 'DELETE API - controlador'
    });
})

module.exports = {
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosPatch,
    UsuariosDelete
}