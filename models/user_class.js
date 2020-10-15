module.exports = (sequelize, type) => {
    const user_class = sequelize.define("user_class", {
        status: type.STRING
    });
    user_class.removeAttribute('id');
    return user_class;
};