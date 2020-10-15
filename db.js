const Sequelize = require('sequelize');

const userModel =  require('./models/users');
const classModel = require('./models/class');
const role_user = require('./models/role_user');
const roleModel = require('./models/role');
const user_class = require('./models/user_class');

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
const Class = classModel(connection, Sequelize);
const RoleUser = role_user(connection, Sequelize);
const Role = roleModel(connection, Sequelize);
const UserClass = user_class(connection, Sequelize);

// Relations
// role_user
User.hasMany(RoleUser, { foreignKey: 'userId', targetKey: 'id' });
Role.hasMany(RoleUser, { foreignKey: 'roleId', targetKey: 'id' });
// user_class
User.hasMany(UserClass, { foreignKey: 'userId', targetKey: 'id' });
Class.hasMany(UserClass, { foreignKey: 'classId', targetKey: 'id' });

// Class has one User
Class.belongsTo(User, {
    foreignKey: {
      name: 'teacherId',
      allowNull:false
    },
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

// force create table and return the promise
connection.sync({ force: false })
    .then(() => {
    console.log('Table created!')
})

//export the models
module.exports = {
    User,
    Class,
    RoleUser,
    Role,
    UserClass
}