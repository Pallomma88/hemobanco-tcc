const connection = require("../database/connection")

async function listarTodos() {
    return connection("tipos_bloqueio").select("*")
}

async function buscarPorId(id) {
    return connection("tipos_bloqueio").where({ id }).first()
}

async function criar(dados) {
    const [id] = await connection("tipos_bloqueio").insert(dados)
    return buscarPorId(id)
}

async function atualizar(id, dados) {
    await connection("tipos_bloqueio").where({ id }).update(dados)
    return buscarPorId(id)
}

async function deletar(id) {
    return connection("tipos_bloqueio").where({ id }).del()
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar
}