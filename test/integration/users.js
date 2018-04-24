process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const should = chai.should();
const User = require('../../models/User');

chai.use(chaiHttp);

describe('AUTHENTICATION', () => {
  let token;

  before((done) => {
    User.remove({}, (err) => { 
      done();         
    });
  });

  describe('GET /', () => {
    it('It should NOT get page if no token provided', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Token not provided.');
          done();
        });
    });
  });

  describe('POST /auth/signup', () => {
    it('It should create a user', (done) => {
      chai.request(app)
        .post('/auth/signup')
        .send({ username: 'johndoe', email: 'john.doe@incorporated.com', password: 'lolololo' })
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
    it('Should fail if email is incorrect', (done) => {
      chai.request(app)
        .post('/auth/signup')
        .send({ username: 'johndoe', email: 'hashshash.com', password: 'lolololo' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('The entered email is not valid!');
          done();
        });
    });
  });

  describe('POST /auth/signin', () => {
    it('It should login a user', (done) => {
      chai.request(app)
        .post('/auth/signin')
        .send({ email: 'john.doe@incorporated.com', password: 'lolololo' })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User johndoe logged in!');
          res.body.user.should.have.property('username');
          res.body.user.should.have.property('email');
          res.body.user.should.have.property('token');
          done();
        });
    });
  });

  describe('GET /', () => {
    it('It should get page if user is logged in', (done) => {
      chai.request(app)
        .post('/auth/signin')
        .send({ email: 'john.doe@incorporated.com', password: 'lolololo' })
        .end((err, res) => {
          chai.request(app)
          .get('/')
          .set('x-access-token', res.body.user.token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Welcome to the user protected area!');
            done();
          });
        });
    });
  });

});