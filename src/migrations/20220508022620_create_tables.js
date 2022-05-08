/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("customers", (tbl) => {
      tbl.increments().notNullable; // id
      tbl.string("name", 50).notNullable();
      tbl.string("email", 20);
      tbl.string("phone", 15);
      tbl.smallint("age");
    })
    .createTable("events", (tbl) => {
      tbl.increments(); // id
      tbl.date("date").notNullable();
      tbl.text("content").notNullable();
      tbl.text("progress").nullable();
      // Foreign key
      tbl
        .integer("customer_id")
        .references("id")
        .inTable("customers")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("customers").dropTableIfExists("events");
};
