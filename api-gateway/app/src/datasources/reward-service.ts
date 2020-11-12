import {HTTPCache, RESTDataSource} from 'apollo-datasource-rest';
import {dataSources} from './';

export class RewardService extends RESTDataSource {
    constructor() {
        super();
        // @TODO Use service names for rest hosts after Apollo Rest datasouce URL resolution closed.
        // Until, we use static ips.
        // this.baseURL = process.env.REWARDS_MICROSERVICE_HOST + ':' + process.env.REWARDS_MICROSERVICE_PORT + '/api';
        this.baseURL = 'http://172.25.0.4' + ':' + process.env.REWARDS_MICROSERVICE_PORT + '/api';
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
