module.exports = (sequelize, type) => {
    const role_user = sequelize.define("role_user", {});
    role_user.removeAttribute('id');
    return role_user;
};