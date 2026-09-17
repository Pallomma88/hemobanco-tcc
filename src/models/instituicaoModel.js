const connection = require("../database/connection")

async function listarTodos() {
    return connection("instituicoes").select("*")
}

async function buscarPorId(id) {
    return connection("instituicoes").where({ id }).first()
}

async function criar(dados) {
    const [id] = await connection("instituicoes").insert(dados)
    return buscarPorId(id)
}

async function atualizar(id, dados) {
    await connection("instituicoes").where({ id }).update(dados)
    return buscarPorId(id)
}

async function deletar(id) {
    return connection("instituicoes").where({ id }).del()
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar
}