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
        },

        assignReward(parent, args) {
            return dataSources.userService
                .assignReward(args.rid, args.uid)
                .then(userRewardRelation => {
                    console.log('User-Reward relation added to User Service.');
                    return dataSources.rewardService.assignReward(userRewardRelation.rid,
                        userRewardRelation.uid);
                }).catch((err) => {
                    console.log('Error while assigning reward:', err.message);
                });
        }
    },

    Reward: {
        users(parent) {
            return dataSources.userService.getUsersByReward(parent.id);
        }
    }
};
