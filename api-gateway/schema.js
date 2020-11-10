import { GraphQLSchema } from 'graphql';
import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} from 'graphql';

export default new GraphQLSchema({
    query: QueryType,
});

const BASE_URL = 'host.docker.internal/';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'The root of all... queries',
    fields: () => ({
        allUsers: {
            type: new GraphQLList(UserType),
            resolve: root => // Fetch the index of people from the REST API,
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (root, args) => // Fetch the person with ID `args.id`,
        },
    }),
});

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A User object',
    fields: () => ({
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
        country: {type: GraphQLString},
        id: {type: GraphQLInt},
        rewards: {
            type: new GraphQLList(RewardType),
            resolve: person => // Fetch the friends with the URLs `person.friends`,
        },
    }),
});


