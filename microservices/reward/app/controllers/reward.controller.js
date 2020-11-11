const db = require("../models");
const Rewards = db.rewards;
const UserRewards = db.user_rewards;
const Op = db.Sequelize.Op;

// Create and Save a new Reward
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.amount || !req.body.expiry_date) {
        res.status(400).send({
            message: "Missing parameters!"
        });
        return;
    }

    // Create a Reward
    const new_reward = {
        name: req.body.name,
        amount: req.body.amount,
        expiry_date: req.body.expiry_date
    };

    // Save reward in the database
    Rewards.create(new_reward)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Reward."
            });
    });
};

// Retrieve all Rewards from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Rewards.findAll({
        // we can add also users for all rewards query later on
        /**
        include: [{
            model: UserRewards,
            as: 'users',
            attributes: ['uid']
        }],**/
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rewards."
            });
    });
};

// Find a single Reward with an id
exports.findOne = (req, res) => {
    const rid = req.params.id;

    Rewards.findByPk(rid, {
        /**
        include: [{
            model: UserRewards,
            as: 'users',
            attributes: ['uid']
        }],**/
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message + "Error retrieving Rewards with id=" + rid
            });
    });
};

// Find rewards by user id
exports.findRewardsByUser = (req, res) => {
    const uid_given = req.params.uid;

    Rewards.findAll({

        include: [{
            model: UserRewards,
            as: 'users',
            attributes: [],
            where: {
                uid: uid_given
            },
            required: true
        }]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message + "Error retrieving Rewards with uid=" + uid_given
            });
        });
};

// Update a Reward by the id in the request
exports.update = (req, res) => {

};

// Delete a Reward with the specified id in the request
exports.delete = (req, res) => {
    const rid = req.params.id;

    Rewards.destroy({
        where: { id: rid }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Reward was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Reward with id=${rid}. Maybe Reward was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Reward with id=" + rid
            });
    });
};

// Delete all Rewards from the database.
exports.deleteAll = (req, res) => {
    Rewards.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Rewards were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Rewards."
            });
        });
};


// Add a new User-Reward relation
exports.addUserReward = (req, res) => {
    // Validate request
    if (!req.body.uid || !req.body.rid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create new User Reward
    const new_user_reward = {
        uid: req.body.uid,
        rid: req.body.rid
    };

    // Save User Reward relation in the database
    UserRewards.create(new_user_reward)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message:
                    "Some error occurred while creating adding User Reward."
            });
        });
};
