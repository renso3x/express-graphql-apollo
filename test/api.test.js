process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const should = chai.should();

const api = require('./fixtures/api.json');

describe('GraphQL', () => {
  beforeEach(() => {
    this.post = sinon.stub(request, 'post');
  });

  afterEach(() => {
    request.post.restore();
  });

  it('Retrieve an Owner and their Pets', done => {
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

  it('List of Owners', done => {
    const obj = api.owners.success;
    const query = '{ owners { id name email } }';

    this.post.yields(null, obj.res, JSON.stringify(obj.body));

    request.post(query, (err, res, body) => {
      res.statusCode.should.equal(200);
      res.headers['content-type'].should.contain('application/json');
      body = JSON.parse(body);
      body.status.should.eql('success');
      body.owners[0].should.include.keys(
        'id',
        'name',
        'address',
        'phone',
        'email'
      );
      done();
    });
  });

  it('Create a pet', done => {
    const obj = api.createPet.success;
    const query =
      'mutation{ createPet(name:"Test" age: 2 colour: "Red" breed: 1 owner: 2) { success message pet { name breed { name } }	} }';

    this.post.yields(null, obj.res, JSON.stringify(obj.body));

    request.post(query, (err, res, body) => {
      res.statusCode.should.equal(200);
      res.headers['content-type'].should.contain('application/json');
      body = JSON.parse(body);
      body.status.should.eql('success');
      body.message.should.eql('Successfully saved!');
      body.pet.should.include.keys(
        'id',
        'name',
        'colour',
        'age',
        'breed',
        'owner'
      );
      done();
    });
  });

  it('Update a pet', done => {
    const obj = api.updatePet.success;
    const query = `mutation{ updatePet( id: 2
          name:"Bae",
          age: 5,
          colour: "green"
          breed: 2
          owner: 1) { success message pet { name breed { name } }	} }`;

    this.post.yields(null, obj.res, JSON.stringify(obj.body));

    request.post(query, (err, res, body) => {
      res.statusCode.should.equal(200);
      res.headers['content-type'].should.contain('application/json');
      body = JSON.parse(body);
      body.status.should.eql('success');
      body.message.should.eql('Successfully saved!');
      body.pet.should.include.keys(
        'id',
        'name',
        'colour',
        'age',
        'breed',
        'owner'
      );
      done();
    });
  });
});
