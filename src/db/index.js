const sqlite3 = require("sqlite3");
const isDevelopment = process.env.NODE_ENV !== "production";

const file_path = isDevelopment
  ? "src/db/customers.sqlite3"
  : "customers.sqlite3";

const db = new sqlite3.Database(file_path, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log(err);
  else {
    console.log("Connection successfull");
  }
});

/**
 * Database instance
 */
export default {
  /**
   * Containing all methods
   */
  methods: {
    /**
     * Close the database
     */
    close() {
      db.close((err) => {
        console.log(err);
      });
    },
  },
};
