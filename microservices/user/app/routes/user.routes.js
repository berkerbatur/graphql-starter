module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/add", users.create);

    // Create a new User Reward relation
    router.post("/reward", users.addUserReward);

    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve all Users having a Reward
    router.get("/having/:rid", users.findUsersByReward);

    // Retrieve a single User with uid
    router.get("/:uid", users.findOne);

    // Update a User with id
    router.put("/:id", users.update);

    // Delete a User with id
    router.delete("/:id", users.delete);

    // Delete all users
    router.delete("/", users.deleteAll);

    app.use('/api/users', router);
};
