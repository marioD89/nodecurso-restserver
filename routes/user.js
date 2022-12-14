
const { Router } = require ('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const { usuariosGet, 
    usuariosPost,
     usuariosPut,
      usuariosDelete,
       usuariosPatch } = require('../controllers/usuarios');

const { esRoleValido, emailExiste, existeUsuarioId } = require('../helpers/db-validators');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom( esRoleValido  ),
    validarCampos    
], usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({min:6}),
    check ('correo', 'El correo noo es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol permitido').isIn('ADMIN_ROLE','USER_ROLE'),
    check('rol').custom( esRoleValido  ),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);






module.exports = router;