const connection = require("../database/connection")

async function listarTodos() {
    return connection("situacoes").select("*")
}

async function buscarPorId(id) {
    return connection("situacoes").where({ id }).first()
}

async function buscarBloqueiosPorDoador(doador_id) {
    return connection("situacoes")
        .where({ doador_id })
        .whereNotNull("tipo_bloqueio_id")
}

async function criar(dados) {
    const [id] = await connection("situacoes").insert(dados)
    return buscarPorId(id)
}

async function atualizar(id, dados) {
    await connection("situacoes").where({ id }).update(dados)
    return buscarPorId(id)
}

async function deletar(id) {
    return connection("situacoes").where({ id }).del()
}

module.exports = {
    listarTodos,
    buscarPorId,
    buscarBloqueiosPorDoador,
    criar,
    atualizar,
    deletar
}