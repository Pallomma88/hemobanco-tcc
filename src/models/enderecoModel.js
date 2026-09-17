const connection = require("../database/connection")

async function listarTodos() {
    return connection("enderecos").select("*")
}

async function buscarPorId(id) {
    return connection("enderecos").where({ id }).first()
}

async function criar(dados) {
    const [id] = await connection("enderecos").insert(dados)
    return buscarPorId(id)
}
    
async function atualizar(id,dados) {
    await connection("enderecos").where({ id }).update(dados)
    return buscarPorId(id)
}

async function deletar(id) {
    return connection("enderecos").where({ id }).del()
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar
}