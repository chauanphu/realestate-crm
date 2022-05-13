// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/_customers_.sqlite3",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./customers.sqlite3",
    },
  },
};
