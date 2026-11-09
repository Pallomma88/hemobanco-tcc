const error = {
  type: "object",
  properties: {
    error: { type: "string", example: "Recurso não encontrado" },
  },
}

const timestamps = {
  created_at: { type: "string", format: "date-time", readOnly: true },
  updated_at: { type: "string", format: "date-time", readOnly: true },
}

const idParam = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "integer", minimum: 1 },
  description: "Identificador do registro",
}

function crudPaths({ tag, path, name, namePlural, schemaRef, createRef, updateRef, notFound, extraCreateResponses = {}, extraDeleteResponses = {} }) {
  return {
    [path]: {
      get: {
        tags: [tag],
        summary: `Listar ${namePlural}`,
        responses: {
          200: {
            description: `Lista de ${namePlural}`,
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: schemaRef } },
              },
            },
          },
        },
      },
      post: {
        tags: [tag],
        summary: `Criar ${name}`,
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: createRef } },
          },
        },
        responses: {
          201: {
            description: `${name} criado`,
            content: { "application/json": { schema: { $ref: schemaRef } } },
          },
          400: {
            description: "Dados inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          ...extraCreateResponses,
        },
      },
    },
    [`${path}/{id}`]: {
      get: {
        tags: [tag],
        summary: `Buscar ${name} por id`,
        parameters: [idParam],
        responses: {
          200: {
            description: name,
            content: { "application/json": { schema: { $ref: schemaRef } } },
          },
          404: {
            description: notFound,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
                example: { error: notFound },
              },
            },
          },
        },
      },
      put: {
        tags: [tag],
        summary: `Atualizar ${name}`,
        parameters: [idParam],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: updateRef } },
          },
        },
        responses: {
          200: {
            description: `${name} atualizado`,
            content: { "application/json": { schema: { $ref: schemaRef } } },
          },
          400: {
            description: "Dados inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          404: {
            description: notFound,
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      delete: {
        tags: [tag],
        summary: `Excluir ${name}`,
        parameters: [idParam],
        responses: {
          204: { description: `${name} excluído` },
          400: {
            description: "Não é possível excluir por vínculo com outros registros",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          500: {
            description: "Erro interno",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          ...extraDeleteResponses,
        },
      },
    },
  }
}

const spec = {
  openapi: "3.0.3",
  info: {
    title: "API Hemobanco",
    version: "1.0.0",
    description: [
      "API REST do sistema de gestão de doação de sangue.",
      "",
      "**Regras de negócio em doações**",
      "- `data_doacao` é obrigatória, precisa ser uma data válida e **não pode ser futura**.",
      "- Doador com situação de bloqueio vigente (`tipo_bloqueio_id` preenchido e `data_limite` nula ou maior/igual à data da doação) **não pode doar**.",
      "- Intervalo mínimo entre doações: **60 dias** para sexo `M` e **90 dias** para sexo `F`.",
      "- CPF é validado (dígitos verificadores) na criação e na atualização de doador.",
    ].join("\n"),
  },
  servers: [{ url: "/", description: "Servidor atual" }],
  tags: [
    { name: "Status", description: "Saúde da API e do banco" },
    { name: "Endereços", description: "Cadastro de endereços" },
    { name: "Tipos sanguíneos", description: "A+, A-, B+, B-, O+, O-, AB+, AB-" },
    { name: "Tipos de doação", description: "Sangue total, plaquetas, plasma, etc." },
    { name: "Tipos de bloqueio", description: "Motivos e prazos de inaptidão" },
    { name: "Instituições", description: "Hospitais e hemocentros" },
    { name: "Funcionários", description: "Profissionais vinculados a instituições" },
    { name: "Doadores", description: "Cadastro de doadores" },
    { name: "Situações", description: "Aptidão ou bloqueio do doador" },
    { name: "Doações", description: "Registros de coleta" },
  ],
  paths: {
    "/": {
      get: {
        tags: ["Status"],
        summary: "Verificar se a API está no ar",
        responses: {
          200: {
            description: "API funcionando",
            content: { "text/html": { schema: { type: "string", example: "API Hemobanco funcionando!" } } },
          },
        },
      },
    },
    "/test": {
      get: {
        tags: ["Status"],
        summary: "Testar conexão com o banco",
        responses: {
          200: {
            description: "Banco conectado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
                example: { message: "Banco conectado com sucesso :)" },
              },
            },
          },
          500: {
            description: "Falha na conexão",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
    ...crudPaths({
      tag: "Endereços",
      path: "/enderecos",
      name: "endereço",
      namePlural: "endereços",
      schemaRef: "#/components/schemas/Endereco",
      createRef: "#/components/schemas/EnderecoInput",
      updateRef: "#/components/schemas/EnderecoUpdate",
      notFound: "Endereço não encontrado",
    }),
    ...crudPaths({
      tag: "Tipos sanguíneos",
      path: "/tipos-sanguineos",
      name: "tipo sanguíneo",
      namePlural: "tipos sanguíneos",
      schemaRef: "#/components/schemas/TipoSanguineo",
      createRef: "#/components/schemas/TipoSanguineoInput",
      updateRef: "#/components/schemas/TipoSanguineoInput",
      notFound: "Tipo sanguíneo não encontrado",
    }),
    ...crudPaths({
      tag: "Tipos de doação",
      path: "/tipos-doacao",
      name: "tipo de doação",
      namePlural: "tipos de doação",
      schemaRef: "#/components/schemas/TipoDoacao",
      createRef: "#/components/schemas/TipoDoacaoInput",
      updateRef: "#/components/schemas/TipoDoacaoInput",
      notFound: "Tipo de doação não encontrado",
    }),
    ...crudPaths({
      tag: "Tipos de bloqueio",
      path: "/tipos-bloqueio",
      name: "tipo de bloqueio",
      namePlural: "tipos de bloqueio",
      schemaRef: "#/components/schemas/TipoBloqueio",
      createRef: "#/components/schemas/TipoBloqueioInput",
      updateRef: "#/components/schemas/TipoBloqueioUpdate",
      notFound: "Tipo de bloqueio não encontrado",
    }),
    ...crudPaths({
      tag: "Instituições",
      path: "/instituicoes",
      name: "instituição",
      namePlural: "instituições",
      schemaRef: "#/components/schemas/Instituicao",
      createRef: "#/components/schemas/InstituicaoInput",
      updateRef: "#/components/schemas/InstituicaoUpdate",
      notFound: "Instituição não encontrada",
    }),
    ...crudPaths({
      tag: "Funcionários",
      path: "/funcionarios",
      name: "funcionário",
      namePlural: "funcionários",
      schemaRef: "#/components/schemas/Funcionario",
      createRef: "#/components/schemas/FuncionarioInput",
      updateRef: "#/components/schemas/FuncionarioUpdate",
      notFound: "Funcionário não encontrado",
    }),
    ...crudPaths({
      tag: "Doadores",
      path: "/doadores",
      name: "doador",
      namePlural: "doadores",
      schemaRef: "#/components/schemas/Doador",
      createRef: "#/components/schemas/DoadorInput",
      updateRef: "#/components/schemas/DoadorUpdate",
      notFound: "Doador não encontrado",
    }),
    ...crudPaths({
      tag: "Situações",
      path: "/situacoes",
      name: "situação",
      namePlural: "situações",
      schemaRef: "#/components/schemas/Situacao",
      createRef: "#/components/schemas/SituacaoInput",
      updateRef: "#/components/schemas/SituacaoUpdate",
      notFound: "Situação não encontrada",
      extraDeleteResponses: {
        204: { description: "Situação excluída" },
      },
    }),
    ...crudPaths({
      tag: "Doações",
      path: "/doacoes",
      name: "doação",
      namePlural: "doações",
      schemaRef: "#/components/schemas/Doacao",
      createRef: "#/components/schemas/DoacaoInput",
      updateRef: "#/components/schemas/DoacaoUpdate",
      notFound: "Doação não encontrada",
      extraCreateResponses: {
        400: {
          description:
            "Data inválida/futura, doador bloqueado, intervalo mínimo entre doações não cumprido ou FK inválida",
          content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
        },
      },
      extraDeleteResponses: {
        204: { description: "Doação excluída" },
      },
    }),
  },
  components: {
    schemas: {
      Error: error,
      Endereco: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          logradouro: { type: "string", example: "Rua das Acácias" },
          numero: { type: "string", nullable: true, example: "245" },
          complemento: { type: "string", nullable: true, example: "Apto 12" },
          bairro: { type: "string", example: "Centro" },
          cidade: { type: "string", example: "Itapevi" },
          estado: { type: "string", minLength: 2, maxLength: 2, example: "SP" },
          cep: { type: "string", example: "06653-090" },
          ...timestamps,
        },
      },
      EnderecoInput: {
        type: "object",
        required: ["logradouro", "cidade", "estado", "cep"],
        properties: {
          logradouro: { type: "string", example: "Rua das Acácias" },
          numero: { type: "string", example: "245" },
          complemento: { type: "string", example: "" },
          bairro: { type: "string", example: "Centro" },
          cidade: { type: "string", example: "Itapevi" },
          estado: { type: "string", example: "SP" },
          cep: { type: "string", example: "06653-090" },
        },
      },
      EnderecoUpdate: {
        type: "object",
        properties: {
          logradouro: { type: "string" },
          numero: { type: "string" },
          complemento: { type: "string" },
          bairro: { type: "string" },
          cidade: { type: "string" },
          estado: { type: "string" },
          cep: { type: "string" },
        },
      },
      TipoSanguineo: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          descricao: { type: "string", example: "A+" },
          ...timestamps,
        },
      },
      TipoSanguineoInput: {
        type: "object",
        required: ["descricao"],
        properties: {
          descricao: { type: "string", example: "A+" },
        },
      },
      TipoDoacao: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          descricao: { type: "string", example: "Sangue Total" },
          ...timestamps,
        },
      },
      TipoDoacaoInput: {
        type: "object",
        required: ["descricao"],
        properties: {
          descricao: { type: "string", example: "Sangue Total" },
        },
      },
      TipoBloqueio: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          descricao: { type: "string", example: "Bloqueio temporário - anemia" },
          prazo_dias: { type: "integer", nullable: true, example: 30, description: "Nulo indica bloqueio permanente" },
          ...timestamps,
        },
      },
      TipoBloqueioInput: {
        type: "object",
        required: ["descricao"],
        properties: {
          descricao: { type: "string", example: "Bloqueio temporário - anemia" },
          prazo_dias: { type: "integer", nullable: true, example: 30 },
        },
      },
      TipoBloqueioUpdate: {
        type: "object",
        properties: {
          descricao: { type: "string" },
          prazo_dias: { type: "integer", nullable: true },
        },
      },
      Instituicao: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          cnpj: { type: "string", example: "45.897.321/0001-12" },
          nome: { type: "string", example: "Hospital São Lucas" },
          email: { type: "string", nullable: true, example: "contato@hospitalsaolucas.com.br" },
          endereco_id: { type: "integer", example: 1 },
          ...timestamps,
        },
      },
      InstituicaoInput: {
        type: "object",
        required: ["cnpj", "nome", "endereco_id"],
        properties: {
          cnpj: { type: "string", example: "45.897.321/0001-12" },
          nome: { type: "string", example: "Hospital São Lucas" },
          email: { type: "string", example: "contato@hospitalsaolucas.com.br" },
          endereco_id: { type: "integer", example: 1 },
        },
      },
      InstituicaoUpdate: {
        type: "object",
        properties: {
          cnpj: { type: "string" },
          nome: { type: "string" },
          email: { type: "string" },
          endereco_id: { type: "integer" },
        },
      },
      Funcionario: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string", example: "Patrícia Nunes Silva" },
          matricula: { type: "string", example: "FUNC-0001" },
          instituicao_id: { type: "integer", example: 1 },
          ...timestamps,
        },
      },
      FuncionarioInput: {
        type: "object",
        required: ["nome", "matricula", "instituicao_id"],
        properties: {
          nome: { type: "string", example: "Patrícia Nunes Silva" },
          matricula: { type: "string", example: "FUNC-0001" },
          instituicao_id: { type: "integer", example: 1 },
        },
      },
      FuncionarioUpdate: {
        type: "object",
        properties: {
          nome: { type: "string" },
          matricula: { type: "string" },
          instituicao_id: { type: "integer" },
        },
      },
      Doador: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          cpf: { type: "string", example: "38957214600" },
          nome: { type: "string", example: "Ana Beatriz Oliveira" },
          sexo: { type: "string", enum: ["M", "F"], example: "F" },
          tipo_sanguineo_id: { type: "integer", example: 1 },
          endereco_id: { type: "integer", example: 1 },
          ...timestamps,
        },
      },
      DoadorInput: {
        type: "object",
        required: ["cpf", "nome", "tipo_sanguineo_id", "endereco_id"],
        properties: {
          cpf: { type: "string", example: "52998224725", description: "11 dígitos, com dígitos verificadores válidos" },
          nome: { type: "string", example: "Ana Beatriz Oliveira" },
          sexo: { type: "string", enum: ["M", "F"], example: "F", description: "Padrão F se omitido. Define o intervalo mínimo entre doações." },
          tipo_sanguineo_id: { type: "integer", example: 1 },
          endereco_id: { type: "integer", example: 1 },
        },
      },
      DoadorUpdate: {
        type: "object",
        properties: {
          cpf: { type: "string" },
          nome: { type: "string" },
          sexo: { type: "string", enum: ["M", "F"] },
          tipo_sanguineo_id: { type: "integer" },
          endereco_id: { type: "integer" },
        },
      },
      Situacao: {
        type: "object",
        properties: {
          id: { type: "integer", example: 3 },
          descricao: { type: "string", example: "Bloqueado temporariamente" },
          tipo_bloqueio_id: { type: "integer", nullable: true, example: 1 },
          motivo: { type: "string", nullable: true, example: "Nível de hemoglobina abaixo do mínimo exigido" },
          data_limite: { type: "string", format: "date", nullable: true, example: "2026-10-15" },
          doador_id: { type: "integer", nullable: true, example: 6 },
          ...timestamps,
        },
      },
      SituacaoInput: {
        type: "object",
        required: ["descricao"],
        properties: {
          descricao: { type: "string", example: "Apto para doação" },
          tipo_bloqueio_id: { type: "integer", nullable: true, example: 1 },
          motivo: { type: "string", example: "Nível de hemoglobina abaixo do mínimo exigido" },
          data_limite: { type: "string", format: "date", example: "2026-12-01" },
          doador_id: { type: "integer", example: 6 },
        },
      },
      SituacaoUpdate: {
        type: "object",
        properties: {
          descricao: { type: "string" },
          tipo_bloqueio_id: { type: "integer", nullable: true },
          motivo: { type: "string" },
          data_limite: { type: "string", format: "date", nullable: true },
          doador_id: { type: "integer", nullable: true },
        },
      },
      Doacao: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          data_doacao: { type: "string", example: "2026-08-10T09:15:00" },
          doador_id: { type: "integer", example: 1 },
          funcionario_id: { type: "integer", example: 1 },
          tipo_doacao_id: { type: "integer", example: 1 },
          situacao_id: { type: "integer", nullable: true, example: 1 },
          ...timestamps,
        },
      },
      DoacaoInput: {
        type: "object",
        required: ["data_doacao", "doador_id", "funcionario_id", "tipo_doacao_id"],
        properties: {
          data_doacao: { type: "string", example: "2026-10-21T09:00:00", description: "Não pode ser data futura" },
          doador_id: { type: "integer", example: 5 },
          funcionario_id: { type: "integer", example: 1 },
          tipo_doacao_id: { type: "integer", example: 1 },
          situacao_id: { type: "integer", nullable: true, example: 1 },
        },
      },
      DoacaoUpdate: {
        type: "object",
        properties: {
          data_doacao: { type: "string" },
          doador_id: { type: "integer" },
          funcionario_id: { type: "integer" },
          tipo_doacao_id: { type: "integer" },
          situacao_id: { type: "integer", nullable: true },
        },
      },
    },
  },
}

module.exports = spec
