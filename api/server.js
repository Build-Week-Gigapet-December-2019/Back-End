const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const authenticate = require('../auth/auth-middleware.js');
const authRouter = require('../auth/auth-router.js');
const parentRouter = require('../parent/parent-router');
// const testRouter = require('../config/testRoutes.js');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/parents', authenticate, parentRouter);
// server.use('/test', testRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

module.exports = server;
