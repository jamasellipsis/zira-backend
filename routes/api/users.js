const router = require('express').Router();

// Import models
const { User, Role , RoleUser, UserClass, Class} = require('../../db');

// Get the classes a user is enrolled in
router.get('/:userId/classes', async (req, res) => {
    const classesUser = await Class.findAll({
        include: [{
            model: UserClass,
            where: { userId: req.params.userId }
           }]
    });
    res.json(classesUser); 
});

// Create new user 
router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

// Change user status where id
router.put('/delete/:userId', async (req, res) => {
    await User.update({
        status: 'Inactive'
    }, {
        where: { id: req.params.userId }
    });
    res.json({success: 'The user has been deleted.'})
});

// Update user where id
router.put('/update/:userId', async (req, res) => {
    await User.update(req.body, {
        where: { id: req.params.userId }
    });
    res.json({success: 'The user has been updated.'})
});

// Get all users
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// Get user by nick_name
router.get('/:username', async (req, res) => {
    const users = await User.findAll({
        where: {
            username: req.params.username
        }
    });
    res.json(users);
});

module.exports = router;