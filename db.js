const Sequelize = require('sequelize');

const userModel =  require('./models/users');

const sequelize = new Sequelize('ebdb', process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
    host: process.env.RDS_HOSTNAME,
    dialect: 'mysql'
});

const User = userModel(sequelize, Sequelize);

//force create table and return the promise
sequelize.sync({ force: false })
    .then(() => {
        console.log('Table created!')
    })

//export the model user
module.exports = { 
    User
}