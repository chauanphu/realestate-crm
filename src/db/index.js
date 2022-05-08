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
    return knex
      .from("customers")
      .leftJoin("events", "customers.id", "=", "events.customer_id")
      .options({ nestTables: true });
  },
  /**
   * Get customer info by id
   * @param {number} id
   * @returns {Promise}
   */
  get_by_id(id) {
    return knex
      .from("customers")
      .leftJoin("events", "customers.id", "=", "events.customer_id")
      .where("customers.id", id)
      .options({ nestTables: true });
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
    return knex("events").select();
  },
  get_by_id(id) {
    return knex("events").where(id);
  },
  add(event) {
    return knex("events").insert(event);
  },
  /**
   *
   * @param {object} id id or customer_id
   * @returns
   */
  delete(id) {
    return knex("events").where(id).del();
  },
};
module.exports = { Customers, Events };
