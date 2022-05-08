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
  async get_all() {
    let customers = await knex.from("customers").select();
    let value = [];
    for (let i = 0; i < customers.length; i++) {
      let events = await Events.get_by_id({ customer_id: customers[i].id });
      value.push({ ...customers[i], events: events });
    }
    return value;
  },
  /**
   * Get customer info by id
   * @param {number} id
   * @returns {Promise}
   */
  async get_by_id(id) {
    let customer = await knex("customers").where({ id: id });
    let events = await Events.get_by_id({ customer_id: id });
    let value = { ...customer[0], events: events };
    return value;
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
