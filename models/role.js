module.exports = (sequelize, type) => {
    const Role = sequelize.define("Role", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        description: type.TEXT
    });

    Role.associate = models => {
        Role.hasMany(models.role_user, {
            onDelete: 'cascade'
        });
    };
    return Role;
};