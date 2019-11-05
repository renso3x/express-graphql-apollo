const { gql } = require('apollo-server');
// The GraphQL schema in string form
const typeDefs = gql`
  type Query {
    owners: [Owner]
    myPets(id: ID!): [Pets]
  }

  type Mutation {
    getOwners: AddPetsResponse!
  }

  type AddPetsResponse {
    success: Boolean
    message: String
    pets: Pets
  }

  type Owner {
    id: ID!
    name: String
    address: String
    phone: String
    email: String
  }

  type Pets {
    id: ID!
    name: String
    colour: String
    age: Int
  }

  type Animal {
    id: ID!
    name: String
  }
`;

module.exports = typeDefs;
