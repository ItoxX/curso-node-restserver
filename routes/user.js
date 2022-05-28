const { Router } = require('express');
const { 
        UsuariosGet, 
        UsuariosPost, 
        UsuariosPut,
        UsuariosDelete,
        UsuariosPatch
    } = require('../controllers/user');

const router = Router();

// GET
router.get('/', UsuariosGet );
// POST
router.post('/', UsuariosPost );
// PUT
router.put('/:id', UsuariosPut );
// PATCH
router.patch('/', UsuariosPatch );
// DELETE
router.delete('/', UsuariosDelete );

module.exports = router;