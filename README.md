# api-testing
Using SuperTest Library (https://github.com/ladjs/supertest) perform API testing of basic REST API methods -  Get User, PUT requests from https://gorest.co.in:
- request Get User
- request PUT

## Installation
1. In the command line create new project directory api-testing, installing npm dependencies and supertest library:
```sh
$ mkdir api-testing
$ cd api-testing
$ npm init -y
$ npm install --save mocha supertest
```
## Create Test Cases
2. Create new directory test (path ...\api-testing\test) and create test cases using Mocha and SuperTest Library in file testApi.js:
```js
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
```
## Run Test Cases
3. In the command line perform next command:
```sh
$ npm test
```
## Test Results
4. Test is passed:

![image](https://github.com/YuriyK2022/api-testing/assets/118524489/0c3ad220-ff48-482c-a41b-64ad05724f7e)
