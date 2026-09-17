exports.up = function(knex) {
    return knex.schema.alterTable("enderecos", (table) => {
        table.string("numero", 10).nullable()
        table.string("complemento", 100).nullable()
        table.string("bairro", 100).notNullable().defaultTo("")
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable("enderecos", (table) => {
        table.dropColumn("numero")
        table.dropColumn("complemento")
        table.dropColumn("bairro")
    })
};