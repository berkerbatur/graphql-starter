# Graphql starter project
Demonstration of Apollo Graphql server with Typescript on top of two Rest APIs developed with Express.

## Project Requirements
- There should be two services to manage Users and Rewards and an API Gateway on top
- User should have uid, name, email, phone, country
- Reward should have id, name, amount, expiry_date
- Rewards should be assigned to users if not expired
- User service should list all users, list a user with given id and rewards that user has, create a new user.
- Reward service should list all rewards, list a reward with given id and users that user has, create a new reward.
- Graphql API-Gateway should be on top of these micro-services.
- Each service should work on its container.
- User and Reward service should have their own databases.

## Installation
- [X] Have Docker installed on your machine.
- [X] Clone the project.
- [X] docker-compose -f docker.compose.yaml up -d

## Usage
#### Available Graphql Queries & Mutations

| Query/Mutation        |  Example                                      | Notes                                 |
|-----------------------|-----------------------------------------------|---------------------------------------|
| `/users`              | query{users{uid,name}}                        | List all users                        |
| `/user`               | query{user(uid:1){name,rewards{id,name}}}     | Query a user with its rewards         |
| `/rewards`            | query{rewards{id,name}}                       | List all rewards                      |
| `/reward`             | query{reward(id:1){id,name,users{uid,name}}}  | Query a reward with users having it   |
| `/createUser`         | mutation{createUser(name:"user2",phone:"phone",country:"country",email:"email"){uid,name}}    | Create a new User             |
| `/createReward`       | mutation{createReward(name:"reward3",amount:350,expiry_date:"2020-11-06T01:24:36.585Z"){id,name}}    | Create a new Reward             |
| `/assignReward`       | mutation{assignReward(rid:1, uid:1){name}}    | Assign a reward to a user             |

## Rest Services Endpoints
### User Service Endpoints
| Endpoint              | Request Type    |  Notes                          |
|-----------------------|-----------------|---------------------------------|
| `/`                   | GET             | Get all users                   |
| `/:uid`               | GET             | Get a user with uid             |
| `/create`             | POST            | Create a new User               |
| `/assign`             | POST            | Create User-Reward relation     | 
| `/having/:rid`        | GET             | Get all users having a reward   |

### Reward Service Endpoints
| Endpoint              | Request Type    |  Notes                              |
|-----------------------|-----------------|-------------------------------------|
| `/`                   | GET             | Get all rewards                     |
| `/:id`                | GET             | Get a reward with id                |
| `/create`             | POST            | Create a new Reward                 |
| `/assign`             | POST            | Create User-Reward relation         | 
| `/having/:uid`        | GET             | Get all rewards that given User has |


## Notes
##### ERRORS
- [X] Restart user-service and reward-service if they are unable to connect postgres container when started.

##### TODO
Following improvements might be considered:

- [X] Apollo Graphql Rest Datasource unable to resolve docker service hostnames given by env. variables, so had to use static IPs for containers. Fix the issue and remove Subnet creation and Static IP usage.
- [X] User-Reward relation can be removed from Users service and only Reward service can have these relations. Reward service can query Users with uid list to get users having a reward.
- [X] Logging should be added.
- [X] Unit tests should be added.
- [X] Error recovery should be added.
- [X] Proper request/response documentation and implementation should be done.
