process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const should = chai.should();
const User = require('../../models/User');

chai.use(chaiHttp);

describe('AUTHENTICATION', () => {
  before((done) => {
    User.remove({}, (err) => { 
      done();         
    });
  });

  describe('POST /auth/signup', () => {
    it('It should create a user', (done) => {
      chai.request(app)
        .post('/auth/signup')
        .send({ username: 'admin', email: 'john.doe@incorporated.com', password: 'lolololo' })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User successfully created!');
          res.body.user.should.have.property('username');
          res.body.user.should.have.property('email');
          res.body.user.should.have.property('token');
          done();
        });
    });
  });
});