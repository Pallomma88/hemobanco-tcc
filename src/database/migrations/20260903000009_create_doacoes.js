/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("doacoes", (table) => {
        table.increments("id").primary()
        table.datetime("data_doacao").notNullable()
        table.integer("doador_id").unsigned().notNullable()
            .references("id").inTable("doadores")
        table.integer("funcionario_id").unsigned().notNullable()
            .references("id").inTable("funcionarios")
        table.integer("tipo_doacao_id").unsigned().notNullable()
            .references("id").inTable("tipos_doacao")
        table.integer("situacao_id").unsigned().nullable()
            .references("id").inTable("situacoes")
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("doacoes")
};
