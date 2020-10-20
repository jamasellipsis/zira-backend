module.exports = (sequelize, type) => {
    const User = sequelize.define("User", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: type.STRING,
	    profile_photo: type.TEXT,
        email: type.STRING,
        password: type.STRING,
        first_name: type.STRING,
        last_name: type.STRING,
        username: type.STRING,
        birth_date: type.DATE
    });
    return User;
};