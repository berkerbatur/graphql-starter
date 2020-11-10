// holds user-reward relations, uid is also a foreign key
// this service knows nothing about reward objects, only has reward ids
module.exports = (sequelize, DataTypes) => {
    const UserRewards = sequelize.define("user_rewards", {
        uid: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        rid: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    });

    return UserRewards;
};
