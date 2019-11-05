const chai = require("chai");
const expect = chai.expect;
const url = `http://localhost:4000`;
const request = require("supertest")(url);

describe("GraphQL", () => {
  it("Retrieve an Owner and their Pets", done => {
    request
      .post("/graphql")
      .send({
        query: "{myPets(userId: 2) { id name breed { name } owner { name} }}"
      })
      .expect(200)
      .end((err, res) => {
        const myPet = res.body.data.myPets[0];
        if (err) return done(err);
        expect(myPet).to.have.property("id");
        expect(myPet).to.have.property("name");
        expect(myPet).to.have.property("breed");
        expect(myPet).to.have.property("owner");
        done();
      });
  });

  it("List Owners", done => {
    request
      .post("/graphql")
      .send({
        query: "{ owners { id name email } }"
      })
      .expect(200)
      .end((err, res) => {
        const owner = res.body.data.owners[0];
        if (err) return done(err);
        expect(owner).to.have.property("id");
        expect(owner).to.have.property("name");
        expect(owner).to.have.property("email");
        done();
      });
  });

  it("Create a pet", done => {
    request
      .post("/graphql")
      .send({
        query: `mutation{ createPet(name:"Test" age: 2 colour: "Red" breed: 1 owner: 2) { success message pet { name breed { name } }	} }`
      })
      .expect(200)
      .end((err, res) => {
        const pet = res.body.data.createPet;
        if (err) return done(err);
        expect(pet).to.have.property("success");
        expect(pet).to.have.property("message");
        expect(pet).to.have.property("pet");
        done();
      });
  });
});
