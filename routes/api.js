const router = require('express').Router();

const apiUsersRoutes = require('./api/users');
const apiClassRoutes = require('./api/classes');
const apiUserClassesRoutes = require('./api/user_classes');
const apiRoleUsersRoutes = require('./api/role_users');

router.use('/users', apiUsersRoutes);
router.use('/class', apiClassRoutes);
router.use('/userClasses', apiUserClassesRoutes);
router.use('/roleUsers', apiRoleUsersRoutes);


module.exports = router;