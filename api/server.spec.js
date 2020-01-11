 // calling it "request" is a common practice

const server = require('./server.js'); // this is our first red, file doesn't exist yet
const request = require('supertest');
 

describe('server.js', () => {

  test('should be the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

})