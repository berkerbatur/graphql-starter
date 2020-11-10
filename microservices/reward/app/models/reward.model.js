// holds reward objects data
module.exports = (sequelize, Sequelize) => {
    const Rewards = sequelize.define("rewards", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.INTEGER
        },
        expiry_date: {
            type: Sequelize.DATE
        }
    });

    return Rewards;
};
