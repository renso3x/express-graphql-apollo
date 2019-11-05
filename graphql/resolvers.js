const owners = require("../db/users.json");
const animals = require("../db/animals.json");
const pets = require("../db/pets.json");

let myPets = pets;

function getBreed(id) {
  return animals.filter(animal => animal.id == id)[0];
}

function addPets(pet) {
  return myPets.push(pet);
}

function getMyPet(id) {
  return myPets
    .filter(pet => pet.id == id)
    .map(resp => {
      return {
        ...resp,
        breed: getBreed(resp.breed)
      };
    })[0];
}

function getMyPets(userId) {
  const owner = owners.filter(owner => owner.id == userId)[0];
  return myPets
    .filter(pet => pet.owner == userId)
    .map(resp => {
      return {
        ...resp,
        breed: getBreed(resp.breed),
        owner
      };
    });
}

module.exports = {
  Query: {
    owners: _ => {
      return owners;
    },
    myPets: (_, { userId }) => {
      return getMyPets(userId);
    },
    myPet: (_, { id }) => {
      return getMyPet(id);
    }
  },
  Mutation: {
    createPet: (_, payload) => {
      const newPet = {
        id: myPets.length + 1,
        ...payload
      };
      addPets(newPet);
      return {
        success: true,
        message: "Successfully saved!",
        pet: getMyPet(newPet.id)
      };
    }
  }
};
