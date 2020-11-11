import { RESTDataSource, HTTPCache } from 'apollo-datasource-rest';

export class UserService extends RESTDataSource {
    constructor() {
        super();
        // this.baseURL = process.env.USERS_MICROSERVICE;
        this.baseURL = 'http://localhost:8001/api/'
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

}

// module.exports = UserService;
