// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/gigapets.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './knex/migrations'
    },
    seeds: { directory: './knex/seeds/dev' }
  },

  
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: __dirname + '/db/migrations',
    },
    seeds: {
        directory: __dirname + '/db/seeds/production',
    },
}
};
