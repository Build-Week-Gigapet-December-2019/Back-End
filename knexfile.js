
var pg = require('pg');
var types = require('pg').types;
// override parsing date column to Date()
types.setTypeParser(1082, val => val);
// pg.defaults.ssl = true;

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/<examples_test>',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    pool: { min: 1, max: 7 },
    acquireConnectionTimeout: 300000,
    useNullAsDefault: true
    // ssl: true
  }

};
