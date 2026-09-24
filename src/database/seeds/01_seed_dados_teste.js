exports.seed = async function(knex) {
    // Limpa as tabelas na ordem certa (das que dependem de outras, para as que não dependem)
    await knex("doacoes").del()
    await knex("situacoes").del()
    await knex("doadores").del()
    await knex("funcionarios").del()
    await knex("instituicoes").del()
    await knex("tipos_bloqueio").del()
    await knex("tipos_doacao").del()
    await knex("tipos_sanguineos").del()
    await knex("enderecos").del()

    await knex.raw(`DELETE FROM sqlite_sequence WHERE name IN (
        'doacoes', 'situacoes', 'doadores', 'funcionarios', 'instituicoes',
        'tipos_bloqueio', 'tipos_doacao', 'tipos_sanguineos', 'enderecos'
    )`)

    await knex("enderecos").insert([
        { logradouro: "Rua das Acácias", numero: "245", complemento: "", bairro: "Centro", cidade: "Itapevi", estado: "SP", cep: "06653-090" },
        { logradouro: "Av. Brasil", numero: "1820", complemento: "Apto 12", bairro: "Jardim Paulista", cidade: "São Paulo", estado: "SP", cep: "01430-001" },
        { logradouro: "Rua Sete de Setembro", numero: "88", complemento: "", bairro: "Centro", cidade: "Osasco", estado: "SP", cep: "06010-000" },
        { logradouro: "Rua das Palmeiras", numero: "412", complemento: "Fundos", bairro: "Vila Nova", cidade: "Barueri", estado: "SP", cep: "06401-100" }
    ])

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

    await knex("tipos_doacao").insert([
        { descricao: "Sangue Total" },
        { descricao: "Plaquetas" },
        { descricao: "Plasma" },
        { descricao: "Concentrado de Hemácias" }
    ])

    await knex("tipos_bloqueio").insert([
        { descricao: "Bloqueio temporário - anemia" },
        { descricao: "Bloqueio temporário - viagem para área de risco" },
        { descricao: "Bloqueio temporário - uso de medicação" },
        { descricao: "Bloqueio permanente" }
    ])

    await knex("instituicoes").insert([
        { cnpj: "45.897.321/0001-12", nome: "Hospital São Lucas", email: "contato@hospitalsaolucas.com.br", endereco_id: 1 },
        { cnpj: "78.234.561/0001-45", nome: "Hemocentro Regional Oeste", email: "contato@hemocentroeste.com.br", endereco_id: 4 }
    ])

    await knex("funcionarios").insert([
        { nome: "Patrícia Nunes Silva", matricula: "FUNC-0001", instituicao_id: 1 },
        { nome: "Roberto Carlos Lima", matricula: "FUNC-0002", instituicao_id: 1 },
        { nome: "Marina Souza Ferreira", matricula: "FUNC-0003", instituicao_id: 2 },
        { nome: "André Luiz Barbosa", matricula: "FUNC-0004", instituicao_id: 2 }
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

    // situacoes referencia doadores e tipos_bloqueio, por isso vem depois dos dois
    await knex("situacoes").insert([
        { descricao: "Apto para doação" },
        { descricao: "Apto para doação" },
        {
            descricao: "Bloqueado temporariamente",
            tipo_bloqueio_id: 1,
            motivo: "Nível de hemoglobina abaixo do mínimo exigido",
            data_limite: "2026-10-15",
            doador_id: 6
        },
        {
            descricao: "Bloqueado temporariamente",
            tipo_bloqueio_id: 2,
            motivo: "Viagem recente para área com risco de malária",
            data_limite: "2026-12-01",
            doador_id: 9
        }
    ])

    // agora que situacoes existe, vincula a situação atual de alguns doadores
    await knex("doadores").where({ id: 6 }).update({ situacao_id: 3 })
    await knex("doadores").where({ id: 9 }).update({ situacao_id: 4 })

    await knex("doacoes").insert([
        { data_doacao: "2026-08-10T09:15:00", doador_id: 1, funcionario_id: 1, tipo_doacao_id: 1, situacao_id: 1 },
        { data_doacao: "2026-08-12T10:30:00", doador_id: 2, funcionario_id: 1, tipo_doacao_id: 2, situacao_id: 1 },
        { data_doacao: "2026-08-15T14:00:00", doador_id: 3, funcionario_id: 2, tipo_doacao_id: 1, situacao_id: 2 },
        { data_doacao: "2026-09-01T08:45:00", doador_id: 4, funcionario_id: 3, tipo_doacao_id: 3, situacao_id: 2 },
        { data_doacao: "2026-09-05T11:20:00", doador_id: 7, funcionario_id: 4, tipo_doacao_id: 4, situacao_id: 1 },
        { data_doacao: "2026-09-17T10:00:00", doador_id: 1, funcionario_id: 1, tipo_doacao_id: 1, situacao_id: null }
    ])
}