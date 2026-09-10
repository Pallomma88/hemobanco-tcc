/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("situacoes", (table) => {
        table.increments("id").primary()
        table.string("descricao", 50).notNullable()
        table.integer("tipo_bloqueio_id").unsigned().nullable()
            .references("id").inTable("tipos_bloqueio")
        table.string("motivo", 200).nullable()
        table.date("data_limite").nullable()
        table.integer("doador_id").unsigned().nullable()
            .references("id").inTable("doadores")
        table.timestamps(true, true)
    }).then(() => {
        // fecha a referencia circular: agora que situacoes existe,
        // adiciona a FK pendente em doadores.situacao_id
        return knex.schema.alterTable("doadores", (table) => {
            table.foreign("situacao_id").references("id").inTable("situacoes")
        })
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable("doadores", (table) => {
        table.dropForeign("situacao_id")
    }).then(() => {
        return knex.schema.dropTable("situacoes")
    })
};
