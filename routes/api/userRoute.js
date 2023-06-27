const router = require('express').Router();

const {
    getUsuario,
    getOneUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    addAmigo,
    deleteAmigo
} = require('../../controller/userControll');

// /api/users
router.route('/').get(getUsuario).post(createUsuario);

// /api/users/:userId
router.route('/:usuarioId')
.get(getOneUsuario)
.put(updateUsuario)
.delete(deleteUsuario);

//  /users/:userId/friends/:friendId
router.route('/:usuarioId/friends/:amigoId')
.post(addAmigo)
.delete(deleteAmigo);

module.exports = router;