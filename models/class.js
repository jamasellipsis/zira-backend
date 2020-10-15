module.exports = (sequelize, type) => {
    const Class = sequelize.define("Class", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: type.STRING,
        id_session: type.STRING,
        id_teacher: type.STRING,
        name: type.STRING,
        description: type.TEXT,
        cost: type.DOUBLE,
        date: type.DATE,
        date_start: type.DATE,
        date_end: type.DATE,
        url_video: type.STRING
    });
    return Class;
};