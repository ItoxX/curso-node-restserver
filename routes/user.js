const { Router } = require('express');
const { check, checkSchema } = require('express-validator');
const { 
        UsuariosGet, 
        UsuariosPost, 
        UsuariosPut,
        UsuariosDelete,
        UsuariosPatch
    } = require('../controllers/user');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middelwares/validar-campos');

const router = Router();

// GET
router.get('/', UsuariosGet );
// POST
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // Validamos que el nombre no este vacio
    check('password', 'El password es obligatorio y más de 6 letras').isLength( { min: 6 } ), //Validamos que la contraseña tenga mínimo 6 caracteres
    check('correo', 'El correo no es válido').isEmail(), // Validamos que es un correo
    check('correo').custom( emailExiste ), // Validación de que si existe el correo
    //check('rol', 'No es un rol válido').isIn( ['ADMIN_ROLE','USER_ROLE'] ), // Validamos que el rol que especifica el backend esta en un listado de roles
    //check('rol', 'No es un rol válido').isIn( ['ADMIN_ROLE','USER_ROLE'] ), // Validamos que el rol que especifica el backend esta en un listado de roles
    check('rol').custom( esRolValido ),
    validarCampos
] ,UsuariosPost );
// PUT
router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),      
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos 
] ,UsuariosPut );
// PATCH
router.patch('/', UsuariosPatch );
// DELETE
router.delete('/:id',[
    check('id','No es un ID válido').isMongoId(), 
    check('id').custom( existeUsuarioPorId ),
    validarCampos 
] ,UsuariosDelete );

module.exports = router;