process.env.NODE_ENV = 'test';
process.env.PORT = 3012;
process.env.DB = "notes-test";

const chai = require('chai');
const chaiHttp = require('chai-http');
const application = require('../app');
const server = application.server;
const app = application.app;
const expect = require('chai').expect;
const userModel = require('../models/user');
let mongo = require('../modules/database');
let should = chai.should();
chai.use(chaiHttp);

describe('/POST /user/create', () => {

    /* TODO: check if mongo.dropDatabase should be awaited manually. It also can be moved to after function. */
    before(function (done) {
        mongo.dropDatabase(process.env.DB);
        done();
    });

    after(function (done) {
        server.close();
        done();
    });

    it('Create new user', async () => {
        let user = {
            password: "user-mega-password",
        };
        const result = await chai.request(app)
            .post('/user/create')
            .send(user);
        result.should.have.status(200);
        result.body.should.be.a('object');
        result.body.should.have.property('result');
        result.body.result.should.eql('success');
        result.body.should.have.property('data');
        result.body.data.should.have.property('user_id');

        let userID = result.body.data.user_id;
        let userObject = await userModel.get(userID);

        expect(userObject).should.be.a('object');
        expect(userObject.user_id).eql(userID);
    });

    it('it should be a user in the database', async () => {
        let user = {
            dummy: "param",
        };
        const result = await chai.request(app)
            .post('/user/create')
            .send(user);
        result.should.have.status(200);
        result.body.should.be.a('object');
        result.body.should.have.property('result').eql('error');

        let collections = await mongo.listCollections();
        expect(collections.length).eq(1); // Created during the previous test
    });

});