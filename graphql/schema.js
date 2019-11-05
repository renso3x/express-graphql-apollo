const { gql } = require('apollo-server');
// The GraphQL schema in string form
const typeDefs = gql`
  type Query {
    owners: [Owner]!
  }

  type Mutation {
    getOwners: AddPetsReponse!
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
    pets: [Pets]!
  }

  type Pets {
    id: ID!
    name: String
    colour: String
    age: Number
    breed: Animal
    user: Owner
  }

  type Animal {
    id: ID!
    name: String
  }
`;

module.exports = typeDefs;
