process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const should = chai.should();

const api = require('./fixtures/api.json');

const base = `http://localhost:4000`;

describe('GraphQL', () => {
  beforeEach(() => {
    this.post = sinon.stub(request, 'post');
  });

  afterEach(() => {
    request.post.restore();
  });

  it.only('Retrieve an Owner and their Pets', done => {
    const obj = api.myPets.success;
    const query =
      '{myPets(userId: 2) { id name breed { name } owner { name} }}';

    this.post.yields(null, obj.res, JSON.stringify(obj.body));

    request.post(query, (err, res, body) => {
      res.statusCode.should.equal(200);
      res.headers['content-type'].should.contain('application/json');
      body = JSON.parse(body);
      body.status.should.eql('success');
      body.myPets[0].should.include.keys('id', 'name', 'breed', 'owner');
      done();
    });
  });

  // it('List of Owners', done => {
  //   request
  //     .post('/graphql')
  //     .send({
  //       query: '{ owners { id name email } }'
  //     })
  //     .expect(200)
  //     .end((err, res) => {
  //       const owner = res.body.data.owners[0];
  //       if (err) return done(err);
  //       expect(owner).to.have.property('id');
  //       expect(owner).to.have.property('name');
  //       expect(owner).to.have.property('email');
  //       done();
  //     });
  // });

  // it('Create a pet', done => {
  //   request
  //     .post('/graphql')
  //     .send({
  //       query: `mutation{ createPet(name:"Test" age: 2 colour: "Red" breed: 1 owner: 2) { success message pet { name breed { name } }	} }`
  //     })
  //     .expect(200)
  //     .end((err, res) => {
  //       const pet = res.body.data.createPet;
  //       if (err) return done(err);
  //       expect(pet).to.have.property('success');
  //       expect(pet).to.have.property('message');
  //       expect(pet).to.have.property('pet');
  //       done();
  //     });
  // });

  // it('Update a pet', done => {
  //   request
  //     .post('/graphql')
  //     .send({
  //       query: `mutation{ updatePet( id: 2
  //         name:"Bae",
  //         age: 5,
  //         colour: "green"
  //         breed: 2
  //         owner: 1) { success message pet { name breed { name } }	} }`
  //     })
  //     .expect(200)
  //     .end((err, res) => {
  //       const pet = res.body.data.updatePet;
  //       if (err) return done(err);
  //       expect(pet).to.have.property('success');
  //       expect(pet).to.have.property('message');
  //       expect(pet).to.have.property('pet');
  //       done();
  //     });
  // });
});
