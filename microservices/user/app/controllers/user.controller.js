const db = require("../models");
const Users = db.users;
const UserRewards = db.user_rewards;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.email || !req.body.phone ||
        !req.body.country) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const new_user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country
    };

    // Save User in the database
    Users.create(new_user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Users.findAll({
        // we can add also rewards for all users query later on
        /**
        include: [{
            model: UserRewards,
            as: 'rewards',
            attributes: ['rid']
        }],**/
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const uid = req.params.uid;

    Users.findByPk(uid, {
        include: [{
            model: UserRewards,
            as: 'rewards',
            attributes: ['rid']
        }],
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message + "Error retrieving User with uid=" + uid
            });
    });
};

// Find users having a specific reward
exports.findUsersByReward = (req, res) => {
    const rid_given = req.params.rid;

    Users.findAll({
        include: [{
            model: UserRewards,
            as: 'rewards',
            attributes: [],
            where: {
                rid: rid_given
            },
            required: true
        }]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message + "Error retrieving Users with rid=" + rid_given
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const uid = req.params.uid;

    Users.destroy({
        where: { uid: uid }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with uid=${uid}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with uid=" + uid
            });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    Users.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Users."
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
