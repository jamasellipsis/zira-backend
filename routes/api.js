const router = require('express').Router();

const apiUsersRoutes = require('./api/users');

router.use('/users', apiUsersRoutes);

module.exports = router;