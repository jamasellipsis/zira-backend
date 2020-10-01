//imports
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
require('./db');

//import api router
const apiRouter = require('./routes/api');

// Settings server
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//send to route api
app.use('/api', apiRouter);

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server running! on port', app.get('port'));
})
