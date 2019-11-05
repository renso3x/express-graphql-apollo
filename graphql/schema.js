const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    owners: [Owner]
    myPets(userId: ID!): [Pet]
    myPet(id: ID!): Pet
  }

  type Mutation {
    createPet(
      name: String
      colour: String
      age: Int
      breed: ID!
      owner: ID!
    ): AddPetsResponse!
  }

  type AddPetsResponse {
    success: Boolean
    message: String
    pet: Pet!
  }

  type Pet {
    id: ID!
    name: String
    colour: String
    age: Int
    breed: Animal
    owner: Owner
  }

  type Owner {
    id: ID!
    name: String
    address: String
    phone: String
    email: String
  }

  type Animal {
    id: ID!
    name: String
  }
`;

module.exports = typeDefs;
