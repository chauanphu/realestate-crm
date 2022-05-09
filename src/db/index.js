const isDevelopment = process.env.NODE_ENV !== "production";
const file_path = isDevelopment
  ? "src/db/customers.sqlite3"
  : "resources/customers.sqlite3";

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
  async add(customer) {
    await knex("customers").insert(customer);
    return await knex("customers").max("id");
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
      .select(
        "customers.id",
        "customers.name",
        "customers.email",
        "events.id as event_id",
        "events.date",
        "events.content",
        "events.progress"
      );
  },
  get_by_id(id) {
    return knex("events").where(id);
  },
  add(event) {
    return knex("events").insert(event);
  },
  async update(event) {
    let check = await this.get_by_id(event);
    // If do not have id => Add
    if (!event.id) {
      return knex("events").insert(event);
      // If there is no record completely matched
    } else if (check.length == 0) {
      let { id, ..._event_ } = event;
      console.log("updated");
      return knex("events").where({ id: id }).update(_event_);
    } else {
      console.log("skipped");
    }
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
