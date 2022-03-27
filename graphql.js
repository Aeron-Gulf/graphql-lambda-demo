const { ApolloServer, gql } = require('apollo-server-lambda');
// const { getInterestById } = require('./resolvers/interest')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Interest {
        id: ID!
        colors: String
        foods: String
        movies: String
        animals: String
    }

    type Query {
        hello: String
        name: String
        interest(id: ID!): Interest
    }
`;

const interestList = [
    {
        id: '1',
        colors: 'blue',
        foods: 'chocolate',
        movies: 'titanic',
        animals: 'dog'
    },
    {
        id: '2',
        colors: 'red',
        foods: 'noodle',
        movies: 'tom and jerry',
        animals: 'cat'
    },
    {
        id: '3',
        colors: 'pink',
        foods: 'rice',
        movies: 'matrix',
        animals: 'fish'
    }
]

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    name: () => 'my name is son',
    interest(obj, args, context, info){
        return interestList.find(interest => interest.id === args.id)
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = server.createHandler();