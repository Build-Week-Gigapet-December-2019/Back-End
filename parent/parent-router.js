// POSTMAN TESTING FORMAT!!!!!!
//

// Authorization Type: API Key
// Key: authorization
// Value: token string WITHOUT ANY KINDA QUOTES!!!!
//
//

const express = require('express');

// Include express router middleware
const router = express.Router();

// Add a 'get' method to express router for our test route
router.get('/', function(req, res) {
  res.send({ msg: 'Hello World' });
});

module.exports = router;
