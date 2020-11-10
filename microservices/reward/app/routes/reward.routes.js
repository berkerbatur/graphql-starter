module.exports = app => {
    const rewards = require("../controllers/reward.controller.js");

    var router = require("express").Router();

    // Create a new Reward
    router.post("/add", rewards.create);

    // Create a new User Reward relation
    router.post("/reward", rewards.addUserReward);

    // Retrieve all Rewards
    router.get("/", rewards.findAll);

    // Retrieve all Rewards having that a User has
    router.get("/having/:uid", rewards.findRewardsByUser);

    // Retrieve a single Reward with id
    router.get("/:id", rewards.findOne);

    // Update a Reward with id
    // router.put("/:id", users.update);

    // Delete a Reward with id
    router.delete("/:id", rewards.delete);

    // Delete all rewards
    router.delete("/", rewards.deleteAll);

    app.use('/api/rewards', router);
};
