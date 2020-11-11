module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/create", users.create);

    // Create a new User Reward relation
    router.post("/assign", users.addUserReward);

    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve all Users having a Reward
    router.get("/having/:rid", users.findUsersByReward);

    // Retrieve a single User with uid
    router.get("/:uid", users.findOne);

    // Update a User with id
    router.put("/:uid", users.update);

    // Delete a User with id
    router.delete("/:uid", users.delete);

    // Delete all users
    router.delete("/", users.deleteAll);

    app.use('/api', router);
};
