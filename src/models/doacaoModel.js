const connection = require("../database/connection")

async function listarTodos() {
    return connection("doacoes").select("*")
}

async function buscarPorId(id) {
    return connection("doacoes").where({ id }).first()
}

async function criar(dados) {
    const [id] = await connection("doacoes").insert(dados)
    return buscarPorId(id)
}

async function atualizar(id, dados) {
    await connection("doacoes").where({ id }).update(dados)
    return buscarPorId(id)
}

async function deletar(id) {
    return connection("doacoes").where({ id }).del()
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar
}