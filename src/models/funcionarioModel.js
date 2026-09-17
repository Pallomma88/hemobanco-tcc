const connection = require("../database/connection")

async function listarTodos() {
    return connection("funcionarios").select("*")
}

async function buscarPorId(id) {
    return connection("funcionarios").where({ id }).first()
}

async function criar(dados) {
    const [id] = await connection("funcionarios").insert(dados)
    return buscarPorId(id)
}

async function atualizar(id, dados) {
    await connection("funcionarios").where({ id }).update(dados)
    return buscarPorId(id)
}

async function deletar(id) {
    return connection("funcionarios").where({ id }).del()
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar
}