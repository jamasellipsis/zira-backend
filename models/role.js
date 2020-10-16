module.exports = (sequelize, type) => {
    const Role = sequelize.define("role", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        description: type.TEXT
    });
    return Role;
};