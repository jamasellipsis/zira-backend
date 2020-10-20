//imports
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const cors = require('cors');
require('./db');

app.use(cors({"origin": "*",
"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
"preflightContinue": true,
"optionsSuccessStatus": 204}))

//import api router
const apiRouter = require('./routes/api');

// Settings server
app.set('port', process.env.RDS_PORT || process.env.DEV_PORT)

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//send to route api
app.use('/api', apiRouter);
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server running! on port', app.get('port'));
})
