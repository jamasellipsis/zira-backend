module.exports = (sequelize, type) => {
    const User = sequelize.define("user", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: type.STRING,
	    profile_photo: type.BLOB,
        email: type.STRING,
        password: type.STRING,
        first_name: type.STRING,
        last_name: type.STRING,
        nick_name: type.STRING,
        birth_date: type.DATE
    });
    return User;
};