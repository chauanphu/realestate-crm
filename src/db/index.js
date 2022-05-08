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
  get_all() {
    return knex.select().from("customers");
  },
  /**
   * Get customer info by id
   * @param {number} id
   * @returns {Promise}
   */
  get_by_id(id) {
    return knex("customers").where("id", id);
  },
  add(customer) {
    return knex("customers").insert(customer);
  },
  update(id, customer) {
    return knex("customers").where({ id: id }).update(customer);
  },
  /**
   *
   * @param {number} id
   * @returns {Promise}
   */
  delete(id) {
    return knex("customers").where({ id: id }).del();
  },
};

const Events = {
  get_all() {
    return knex("events")
      .join("customers", "events.customer_id", "=", "customers.id")
      .select();
  },
  add(event) {
    return knex("events").insert(event);
  },
};
module.exports = { Customers, Events };
