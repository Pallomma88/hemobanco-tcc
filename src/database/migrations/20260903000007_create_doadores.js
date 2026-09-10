/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("doadores", (table) => {
        table.increments("id").primary()
        table.string("cpf", 11).notNullable().unique()
        table.string("nome", 150).notNullable()
        table.integer("tipo_sanguineo_id").unsigned().notNullable()
            .references("id").inTable("tipos_sanguineos")
        table.integer("endereco_id").unsigned().notNullable()
            .references("id").inTable("enderecos")
        // situacao_id eh adicionado depois, na migration de situacoes,
        // porque doadores e situacoes se referenciam mutuamente
        table.integer("situacao_id").unsigned().nullable()
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("doadores")
};
