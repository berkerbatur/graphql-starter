// holds user objects data
module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        uid: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        }
    });

    return Users;
};
