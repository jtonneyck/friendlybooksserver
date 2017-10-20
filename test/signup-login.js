let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let expect = chai.expect
let db = require("../models/index")

chai.use(chaiHttp);
const agent =  chai.request.agent('http://localhost:3000')


describe('/POST signup', () => {
    before(async function() {
      // await db.sequelize.sync({force: true})
    })
    it('it should sign up a user', (done) => {
    agent
      .post('/signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ password:'123', username: 'testUser' })
      .end((err, res) => {
          res.should.have.status(200);
        done();
      });
    });
})

describe('/POST login', () => {
    it('it should log in a user', (done) => {
    agent
      .post('/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ password:'123', username: 'testUser' })
      .end((err, res) => {
          res.should.have.status(200);
        done();
      });
    });
    it('it should check if a session has started', (done) => {
    agent
      .get('/profile')
      .end((err, res, req) => {
          console.log("Response" + JSON.stringify(res, null, 2))
          res.should.have.status(200);
        done();
      });
    });
})

describe('GET logout', () => {
  it('log out user', (done) => {
    chai.request(server)
      .get("/logout")
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})

describe('POST token base login', () => {
  it("logs in user with token, no session", (done) => {
    agent
      .post('/logintoken')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ password:'123', username: 'testUser' })
      .end((err, res) => {
          res.should.have.status(200);
        done();
      });
  })
  it('tries to reached an shielded api', (done) => {
    agent
      .get("/secret")
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})








