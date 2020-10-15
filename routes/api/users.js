const router = require('express').Router();

// Import models
const { User, Role , RoleUser, UserClass, Class} = require('../../db');

// get the classes a user is enrolled in
router.get('/:userId/classes', async (req, res) => {
    const classesUser = await Class.findAll({
        include: [{
            model: UserClass,
            where: { userId: req.params.userId }
           }]
    });
    res.json(classesUser); 
});

// create new user 
router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

// change user status where id
router.put('/delete/:userId', async (req, res) => {
    await User.update({
        status: 'Inactive'
    }, {
        where: { id: req.params.userId }
    });
    res.json({success: 'The user has been deleted.'})
});

// update user where id
router.put('/update/:userId', async (req, res) => {
    await User.update(req.body, {
        where: { id: req.params.userId }
    });
    res.json({success: 'The user has been updated.'})
});

// get all users
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

module.exports = router;