process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const should = chai.should();

chai.use(chaiHttp);

describe('POST auth', () => {
  it('It should create a user', (done) => {
    chai.request(app)
      .post('/auth')
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