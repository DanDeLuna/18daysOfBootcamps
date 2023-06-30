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

///api/users
router.route('/').get(getUsuario).post(createUsuario);

///api/users/:userId
router.route('/:userId')
.get(getOneUsuario)
.put(updateUsuario)
.delete(deleteUsuario);

//  friends
router.route('/:userId/friends/:amigoId')
.post(addAmigo)
.delete(deleteAmigo);

module.exports = router;