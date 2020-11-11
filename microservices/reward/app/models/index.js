const dbConfig = require("../config/db.config.js");

var reconnectOptions = {
    max_retries: 10,
    onRetry: function(count) {
        console.log("connection lost, trying to reconnect ("+count+")");
    }
};

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    reconnect: reconnectOptions || true,
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

db.rewards = require("./reward.model.js")(sequelize, Sequelize);
db.user_rewards = require("./user-reward.model.js")(sequelize, Sequelize);

// rewards will have many user-reward relations
db.rewards.hasMany(db.user_rewards, { as: "users", foreignKey: 'rid' });
/**db.user_rewards.belongsTo(db.users, {
    foreignKey: "id",
    as: "",
});**/

module.exports = db;
