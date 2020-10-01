const router = require('express').Router();

// Import model user
const { User } = require('../../db');

// get all users
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// create new user 
router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

// update user where id
router.put('/:userId', async (req, res) => {
    await User.update(req.body, {
        where: { id: req.params.userId }
    });
    res.json({success: 'Update user.'})
});

// delete user where id
router.delete('/:userId', async (req, res) => {
    await User.destroy({
        where: { id: req.params.userId }
    });
    res.json({success: 'Delete user.'})
})

module.exports = router;