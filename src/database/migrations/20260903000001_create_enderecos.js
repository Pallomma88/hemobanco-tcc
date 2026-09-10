/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("enderecos", (table) => {
        table.increments("id").primary()
        table.string("logradouro", 150).notNullable()
        table.string("cidade", 100).notNullable()
        table.string("estado", 2).notNullable()
        table.string("cep", 9).notNullable()
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("enderecos")
};
