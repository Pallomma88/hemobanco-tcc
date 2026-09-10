/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("doador", (table) => {
        table.increments('id').primary();
        table.string("cpf", 14).notNullable().unique();
        table.string("nome", 100).notNullable();
        table.string("email", 100).unique();
        table.string("telefone", 20);
        table.integer("tipo_sanguineo_id").unsigned();
        table.integer("endereco_id").unsigned();
        table.integer("situacao_id").unsigned();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("doador");
};
