import { RESTDataSource, HTTPCache } from 'apollo-datasource-rest';

export class UserService extends RESTDataSource {
    constructor() {
        super();
        // @TODO Use service names for rest hosts after Apollo Rest datasouce URL resolution closed.
        // Until, we use static ips.
        // this.baseURL = process.env.USERS_MICROSERVICE_HOST + ':' + process.env.USERS_MICROSERVICE_PORT + '/api';
        this.baseURL = 'http://172.25.0.3' + ':' + process.env.USERS_MICROSERVICE_PORT + '/api';
        this.httpCache = new HTTPCache()
    }

    async getUsers() {
        return this.get(``);
    }

    async getUser(uid) {
        return this.get(`${uid}`);
    }

    async getUsersByReward(rewardId) {
        return this.get(`having/${rewardId}`);
    }

    // an example making an HTTP POST request
    async createUser(user) {
        return this.post(
            `create`, // path
            user, // request body
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

// module.exports = UserService;
