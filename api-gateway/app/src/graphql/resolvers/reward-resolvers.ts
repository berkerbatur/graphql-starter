import {dataSources} from '../../datasources';

export default {
    Query: {
        rewards() {
            return dataSources.rewardService.getRewards();
        },

        reward(parent, args) {
            return dataSources.rewardService.getReward(args.id);
        }
    },

    Mutation: {
        createReward(parent, args) {
            return dataSources.rewardService
                .createReward({
                    name: args.name,
                    amount: args.amount,
                    expiry_date: args.expiry_date
                })
                .then(reward => {
                    return reward;
                });
        }
    },

    Reward: {
        users(parent) {
            return dataSources.userService.getUsersByReward(parent.id);
        }
    }
};
