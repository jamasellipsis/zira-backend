const router = require('express').Router();

// Import models
const { UserClass, User } = require('../../db');

// Get the classes a user is enrolled in
router.get('/:classId/users', async (req, res) => {
    const userClasses = await User.findAll({
        include: [{
            model: UserClass,
            where: { classId: req.params.classId }
           }]
    });
    res.json(userClasses);
});

// Join to class
router.post('/', async (req, res) => {
    const userClasses = await UserClass.create(req.body)
    res.json(userClasses);
});

// Delete user from class
router.delete('/:classId/:userId', async (req, res) => {
    await UserClass.destroy({
        where: {
            userId: req.params.userId,
            classId: req.params.classId
        }
    });
    res.json({success: 'The user has been deleted.'})
});

module.exports = router;