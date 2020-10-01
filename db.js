const Sequelize = require('sequelize');

const userModel =  require('./models/users');

// On the left site are the production variables and the right side are developer variables
var dbData = {
    host     : process.env.RDS_HOSTNAME || process.env.DEV_HOSTNAME,
    user     : process.env.RDS_USERNAME || process.env.DEV_USERNAME,
    password : process.env.RDS_PASSWORD || process.env.DEV_PASSWORD,
    db_name  : process.env.RDS_DB_NAME || process.env.DEV_DB_NAME
};

// Set connection with database
console.log(dbData)
const connection = new Sequelize(dbData.db_name, dbData.user, dbData.password, {
    host: dbData.host,
    dialect: 'mysql'
});

// Create models database
const User = userModel(connection, Sequelize);

// force create table and return the promise
connection.sync({ force: false })
    .then(() => {
    console.log('Table created!')
})

//export the model user
module.exports = {
    User
}