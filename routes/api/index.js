const router = require('express').Router();
const usuarioRoutes = require('./userRoute');
const thoughtRoutes = require('./thoughtRoute');

router.use('/users', usuarioRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;