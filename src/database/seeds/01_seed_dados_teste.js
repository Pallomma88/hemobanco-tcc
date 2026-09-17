exports.seed = async function(knex) {
    // Limpa as tabelas na ordem certa (das que dependem de outras, para as que não dependem)
    await knex("doadores").del()
    await knex("instituicoes").del()
    await knex("enderecos").del()
    await knex("tipos_sanguineos").del()

    await knex.raw("DELETE FROM sqlite_sequence WHERE name IN ('doadores', 'instituicoes', 'enderecos', 'tipos_sanguineos')")

    await knex("tipos_sanguineos").insert([
        { descricao: "A+" },
        { descricao: "A-" },
        { descricao: "B+" },
        { descricao: "B-" },
        { descricao: "O+" },
        { descricao: "O-" },
        { descricao: "AB+" },
        { descricao: "AB-" }
    ])

    await knex("enderecos").insert([
    { logradouro: "Rua das Acácias", numero: "245", complemento: "", bairro: "Centro", cidade: "Itapevi", estado: "SP", cep: "06653-090" },
    { logradouro: "Av. Brasil", numero: "1820", complemento: "Apto 12", bairro: "Jardim Paulista", cidade: "São Paulo", estado: "SP", cep: "01430-001" },
    { logradouro: "Rua Sete de Setembro", numero: "88", complemento: "", bairro: "Centro", cidade: "Osasco", estado: "SP", cep: "06010-000" },
    { logradouro: "Rua das Palmeiras", numero: "412", complemento: "Fundos", bairro: "Vila Nova", cidade: "Barueri", estado: "SP", cep: "06401-100" }
])

    await knex("instituicoes").insert([
        { cnpj: "45.897.321/0001-12", nome: "Hospital São Lucas", email: "contato@hospitalsaolucas.com.br", endereco_id: 1 },
        { cnpj: "78.234.561/0001-45", nome: "Hemocentro Regional Oeste", email: "contato@hemocentroeste.com.br", endereco_id: 4 }
    ])

    await knex("doadores").insert([
        { cpf: "38957214600", nome: "Ana Beatriz Oliveira", tipo_sanguineo_id: 1, endereco_id: 1 },
        { cpf: "62841793500", nome: "Carlos Eduardo Santos", tipo_sanguineo_id: 5, endereco_id: 2 },
        { cpf: "19473682800", nome: "Fernanda Lima Costa", tipo_sanguineo_id: 3, endereco_id: 3 },
        { cpf: "50128463700", nome: "Rafael Almeida Pereira", tipo_sanguineo_id: 2, endereco_id: 1 },
        { cpf: "84612395700", nome: "Juliana Martins Rocha", tipo_sanguineo_id: 6, endereco_id: 2 },
        { cpf: "27364851900", nome: "Bruno Henrique Souza", tipo_sanguineo_id: 7, endereco_id: 4 },
        { cpf: "91847263500", nome: "Camila Ferreira Dias", tipo_sanguineo_id: 4, endereco_id: 3 },
        { cpf: "63519274800", nome: "Diego Rodrigues Alves", tipo_sanguineo_id: 8, endereco_id: 1 },
        { cpf: "48273619500", nome: "Larissa Gomes Barbosa", tipo_sanguineo_id: 1, endereco_id: 4 },
        { cpf: "75931682400", nome: "Thiago Monteiro Cardoso", tipo_sanguineo_id: 5, endereco_id: 2 }
    ])
}