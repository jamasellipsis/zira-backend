module.exports = (sequelize, type) => {
    const user_class = sequelize.define("user_class", {
        description: type.STRING
    });

    user_class.associate = models => {
        user_class.belongsToMany(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        user_class.belongsToMany(models.Class, {
            foreignKey:{
                allowNull: false
            }
        });
    };
    return user_class;
};