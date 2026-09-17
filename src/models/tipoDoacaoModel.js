const connection = require("../database/connection")

async function listarTodos() {
    return connection("tipos_doacao").select("*")
}
//select * from tipos_doacao;

async function buscarPorId(id) {
    return connection("tipos_doacao").where({ id }).first()
}

async function criar(dados) {
    const [id] = await connection("tipos_doacao").insert(dados)
    return buscarPorId(id)
}

async function atualizar(id, dados) {
    await connection("tipos_doacao").where({ id }).update(dados)
    return buscarPorId(id)
}

async function deletar(id) {
    return connection("tipos_doacao").where({ id }).del()
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar
}