const isDevelopment = process.env.NODE_ENV !== "production";
const file_path = isDevelopment
  ? "src/db/customers.sqlite3"
  : "customers.sqlite3";

const knex = require("knex")({
  client: "sqlite3", // or 'better-sqlite3'
  connection: {
    filename: file_path,
    flags: ["OPEN_READWRITE"],
    useNullAsDefault: true,
  },
});

const Customers = {
  /**
   * Get All Customers
   * @param {string} params columns to be selected
   * @returns {Promise}
   */
  get_all(params = "") {
    return knex.select(params).from("customers");
  },
  /**
   * Get customer info by id
   * @param {*} id
   * @returns
   */
  get_by_id(id) {
    return knex("customers").where("id", id);
  },
  add(customer) {
    knex("customers").insert(customer);
    return knex.select("id").from("customers");
  },
};

const Events = {
  get_all() {
    return knex("events")
      .join("customers", "events.customer_id", "=", "customers.id")
      .select();
  },
};
module.exports = { Customers, Events };
