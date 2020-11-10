const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.user_rewards = require("./user-reward.model.js")(sequelize, Sequelize);

// users will have many user-reward relations
db.users.hasMany(db.user_rewards, { as: "rewards", foreignKey: 'uid' });
/**db.user_rewards.belongsTo(db.users, {
    foreignKey: "id",
    as: "",
});**/

module.exports = db;
