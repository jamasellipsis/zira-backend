require('dotenv/config');
const router = require('express').Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Import models
const { User, Role , RoleUser, UserClass, Class} = require('../../db');

// s3 key
const s3 = new AWS.S3({
    accessKeyId: 'AKIAIVW5737FRIQQ2ORQ',
    secretAccessKey: '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'
})
// storage image
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
});
const upload = multer({ storage }).single('profile_photo')
// Create new user 
router.post('/', upload, async (req, res) => {
    let params = null
    if (req.file)
    {
        const file_up = req.file.originalname.split('.');
        const file_type = file_up[file_up.length - 1]
        params = {
            Bucket: 'zira-backend',
            Key: `${uuidv4()}.${file_type}`,
            Body: req.file.buffer
        }
        s3.upload(params, (error, data) => {
            if(error){
                console.log(error)
            }
        })
    }
    const user = await User.create(params ?{
        ...req.body,
        profile_photo: params.Key
    }:req.body);
    res.json(user);
});

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

router.get('/id/:id', async (req, res) => {
    const users = await User.findAll({
        where: {
            id: req.params.id
        }
    });
    res.json(users);
});

module.exports = router;