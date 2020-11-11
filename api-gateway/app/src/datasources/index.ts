import { UserService } from './user-service';
import { RewardService } from './reward-service';

// Set up the dataSources needed by our resolvers
// export const dataSources = () => ({
//     userService: new UserService(),
//     rewardService: new RewardService(),
// });

//
export const dataSources = {
    userService: new UserService(),
    rewardService: new RewardService()
};
