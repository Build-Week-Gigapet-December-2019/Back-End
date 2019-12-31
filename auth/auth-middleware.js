const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
=======
const secrets = require('../config/secrets.js') || require('./secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token, 'TOKEN');
  token ? console.log('TOKEN TRUE') : console.log('TOKEN FALSE');
>>>>>>> empty-branch

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
      if (err) {
        res.status(401).json({ you: "aren't a registered parent" });
      } else {
<<<<<<< HEAD
        req.decodedJwt = decodedJwt;
=======
        console.log('AM I HERE?');
        // console.log(req, 'THIS IS THE REQUEST');
        // req.decodedJwt = decodedJwt;
>>>>>>> empty-branch
        next();
      }
    });
  } else {
    res.status(401).json({ you: 'need a token, friend.' });
  }
};
