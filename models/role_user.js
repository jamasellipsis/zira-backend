module.exports = (sequelize, type) => {
    const role_user = sequelize.define("role_user", {
        description: type.STRING
    });


    role_user.associate = models => {
        role_user.belongsToMany(models.User, {
            foreignKey:{
                allowNull: false
            }   
        });
        role_user.belongsToMany(models.Role, {
            foreignKey:{
                allowNull: false
            }
        });
    };
    return role_user;
};