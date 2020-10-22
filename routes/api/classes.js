require('dotenv/config');
const router = require('express').Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Import models
const { Class } = require('../../db');

// s3 key
const s3 = new AWS.S3({
    accessKeyId: 'AKIAID2SDCAJBZRKSHAQ',
    secretAccessKey: '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'
})
// storage image
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
});
const upload = multer({ storage }).single('class_photo')

// Create new class
router.post('/',upload, async (req, res) => {
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
            console.log(data);
        })
    }
    const class_ = await Class.create(params ?{
        ...req.body,
        class_photo: params.Key,
        id_session: `${uuidv4()}`,
    }:req.body);
    res.json(class_);
});

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

// Change class status where id
router.put('/delete/:classId', async (req, res) => {
    await Class.update({
        status: 'Inactive'
    }, {
        where: { id: req.params.classId }
    });
    res.json({success: 'The class has been deleted.'})
});

// Update class where id
router.put('/update/:classId', async (req, res) => {
    await Class.update(req.body, {
        where: { id: req.params.classId }
    });
    res.json({success: 'The class has been updated.'})
});


module.exports = router;