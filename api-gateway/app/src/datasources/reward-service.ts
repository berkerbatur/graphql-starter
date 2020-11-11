import {HTTPCache, RESTDataSource} from 'apollo-datasource-rest';
import {UserService} from "./user-service";

export class RewardService extends RESTDataSource {
    constructor() {
        super();
        // this.baseURL = process.env.REWARDS_MICROSERVICE;
        this.baseURL = 'http://localhost:8002/api'
        this.httpCache = new HTTPCache()
    }

    async getRewards() {
        return this.get(`/`);
    }

    async getReward(id) {
        return this.get(`/${id}`);
    }

    async getRewardsByUser(userId) {
        return this.get(`/having/${userId}`);
    }

    // an example making an HTTP POST request
    async createReward(reward) {
        return this.post(
            `create`, // path
            reward, // request body
        );
    }

    // an example making an HTTP POST request
    async assignReward(rewardId, userId) {
        return this.post(
            `assign`, // path
            {'rid': rewardId, 'uid': userId}
        );
    }

}

// module.exports = RewardService;