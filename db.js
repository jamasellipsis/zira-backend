const Sequelize = require('sequelize');

const userModel =  require('./models/users');

const sequelize = new Sequelize('apitest', 'root', 'alejandro123', {
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