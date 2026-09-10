/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("funcionarios", (table) => {
        table.increments("id").primary()
        table.string("nome", 150).notNullable()
        table.string("matricula", 20).notNullable().unique()
        table.integer("instituicao_id").unsigned().notNullable()
            .references("id").inTable("instituicoes")
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("funcionarios")
};
