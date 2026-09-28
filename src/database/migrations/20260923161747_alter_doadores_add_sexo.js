/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable("doadores", (table) => {
        table.string("sexo", 1).notNullable().defaultTo("F")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable("doadores", (table) => {
        table.dropColumn("sexo")
    })
};