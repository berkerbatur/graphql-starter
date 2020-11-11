import {dataSources} from '../../datasources';

export default {
    Query: {
        users() {
            return dataSources.userService.getUsers();
        },

        user(parent, args) {
            return dataSources.userService.getUser(args.uid);
        }
    },

    Mutation: {
        createUser(parent, args) {
            return dataSources.userService
                .createUser({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                    country: args.country,
                })
                .then(user => {
                    return user;
                });
        }
    },

    User: {
        rewards(parent) {
            return dataSources.rewardService.getRewardsByUser(parent.uid);
        }
    }
};
