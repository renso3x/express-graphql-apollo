const owners = require('../db/users.json');
const animals = require('../db/animals.json');
const pets = require('../db/pets.json');

module.exports = {
  Query: {
    owners: _ => {
      return owners;
    },
    myPets: (_, { id }) => {
      const results = pets.filter(pet => {
        if (pet.owner == id) {
          return Object.assign({}, pet);
        }
      });
      return results;
    }
  }
};
