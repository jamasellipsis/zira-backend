const router = require('express').Router();

// Import models
const { Class } = require('../../db');

// Get all classes (just active classes)
router.get('/', async (req, res) => {
    const classes = await Class.findAll({
            where: { status: 'Active' }
        }
    );
    res.json(classes);
});

// Get class by id (just active classes)
router.get('/:classId', async (req, res) => {
    const class_ = await Class.findAll({
            where: { 
                status: 'Active',
                id: req.params.classId
            }
        }
    );
    res.json(class_);
});

// Create new class
router.post('/', async (req, res) => {
    const class_ = await Class.create(req.body)
    res.json(class_);
});

// change class status where id
router.put('/delete/:classId', async (req, res) => {
    await Class.update({
        status: 'Inactive'
    }, {
        where: { id: req.params.classId }
    });
    res.json({success: 'The class has been deleted.'})
});

module.exports = router;