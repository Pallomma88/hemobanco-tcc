const connection = require("../database/connection")

async function listarTodos() {
    return connection("doadores").select("*")
}

async function buscarPorId(id) {
    return connection("doador").where({ id }).first()
} 
async function criar(dados) {
    const [id] = await connection("doador").insert(dados)
}


async function atualizar(id, dados) {
    await connection("doador").where({ id }).update(dados)
    return buscarPorId(id)
}

async function deletar(id) {
    return connection("doador").where({ id }).del()
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar
}
