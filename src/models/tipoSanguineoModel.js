const connection = require("../database/connection")

async function listarTodos() {
    return connection("tipos_sanguineos").select("*")
}

async function buscarPorId(id) {
    return connection("tipos_sanguineos").where({ id }).first()
}

async function criar(dados) {
    const [id] = await connection("tipos_sanguineos").insert(dados)
    return buscarPorId(id)
}

async function atualizar(id, dados) {
    await connection("tipos_sanguineos").where({ id }).update(dados)
    return buscarPorId(id)
}

async function deletar(id) {
    return connection("tipos_sanguineos").where({ id }).del()
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar
}