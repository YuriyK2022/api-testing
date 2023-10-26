// test/api-methods.js
const request = require('supertest');
const app = 'https://gorest.co.in/public-api/';
const assert = require('assert');

describe('API Methods', function () {
  let userId;

  before('Create a test user', function (done) {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'male',
      status: 'active',
    };

    request(app)
      .post('users')
      .set('Authorization', 'Bearer your-access-token')
      .send(newUser)
      .end(function (err, res) {
        if (err) return done(err);
        userId = res.body.data.id;
        done();
      });
  });

  after('Delete the test user', function (done) {
    request(app)
      .delete(`users/${userId}`)
      .set('Authorization', 'Bearer your-access-token')
      .end(function (err) {
        done(err);
      });
  });

  it('GET User: should retrieve user details', function (done) {
    request(app)
      .get(`users/${userId}`)
      .set('Authorization', 'Bearer your-access-token')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert(res.body.data.id === userId, 'User ID mismatch');
        done();
      });
  });

  it('PUT: should update a user', function (done) {
    const updatedUser = {
      name: 'Updated Name',
      status: 'inactive',
    };

    request(app)
      .put(`users/${userId}`)
      .set('Authorization', 'Bearer your-access-token') // Replace with your access token
      .send(updatedUser)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

