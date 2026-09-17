const enderecoModel = require("../models/enderecoModel")

async function listarTodos(req, res) {
    const enderecos = await enderecoModel.listarTodos()
    res.json(enderecos)
}

async function buscar(req, res) {
    const endereco = await enderecoModel.buscarPorId(req.params.id)
    if (!endereco) return res.status(404).json({ error: "Endereço não encontrado" })
    res.json(endereco)
}

async function criar(req, res) {
    try {
        const endereco = await enderecoModel.criar(req.body)
        res.status(201).json(endereco)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível criar o endereço" })
    }
}

async function atualizar(req, res) {
    try {
        const endereco = await enderecoModel.atualizar(req.params.id, req.body)
        if (!endereco) return res.status(404).json({ error: "Endereço não encontrado" })
        res.json(endereco)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível atualizar o endereço" })
    }
}

async function deletar(req, res) {
    try {
        await enderecoModel.deletar(req.params.id)
        res.status(204).send()
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ error: "Não é possível excluir: existem doadores vinculados a este endereço" })
        }
        res.status(500).json({ error: "Erro ao excluir o endereço" })
    }
}

module.exports = {
    listarTodos,
    buscar, 
    criar,
    atualizar,
    deletar
}