/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("instituicoes", (table) => {
        table.increments("id").primary()
        table.string("cnpj", 18).notNullable().unique()
        table.string("nome", 150).notNullable()
        table.string("email", 150).nullable()
        table.integer("endereco_id").unsigned().notNullable()
            .references("id").inTable("enderecos")
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("instituicoes")
};
