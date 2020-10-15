const router = require('express').Router();

const apiUsersRoutes = require('./api/users');
const apiClassRoutes = require('./api/classes');

router.use('/users', apiUsersRoutes);
router.use('/class', apiClassRoutes);

module.exports = router;