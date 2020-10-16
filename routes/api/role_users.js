const router = require('express').Router();

// Import models
const { RoleUser } = require('../../db');

// Get all roles by id user
router.get('/:userId', async (req, res) => {
    const roles = await RoleUser.findAll({
        where: {
            userId: req.params.userId
        }
    });
    res.json(roles);
});

module.exports = router;