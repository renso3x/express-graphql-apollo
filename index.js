// const express = require('express');
// const bodyParser = require('body-parser');
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer } = require('apollo-server');

// Some fake data
const owners = require('./db/users.json');
const animals = require('./db/animals.json');
const pets = require('./db/pets.json');

const typeDefs = require('./graphql/schema');

// The resolvers

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
