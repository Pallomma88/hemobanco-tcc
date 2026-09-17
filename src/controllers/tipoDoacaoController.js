const tipoDoacaoModel = require("../models/tipoDoacaoModel")

async function listarTodos(req, res) {
    const tipos = await tipoDoacaoModel.listarTodos()
    res.json(tipos)
}

async function buscar(req, res) {
    const tipo = await tipoDoacaoModel.buscarPorId(req.params.id)
    if (!tipo) return res.status(404).json({ error: "Tipo de doação não encontrado" })
    res.json(tipo)
}

async function criar(req, res) {
    try {
        const tipo = await tipoDoacaoModel.criar(req.body)
        res.status(201).json(tipo)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível criar o tipo de doação" })
    }
}

async function atualizar(req, res) {
    try {
        const tipo = await tipoDoacaoModel.atualizar(req.params.id, req.body)
        if (!tipo) return res.status(404).json({ error: "Tipo de doação não encontrado" })
        res.json(tipo)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível atualizar o tipo de doação" })
    }
}

async function deletar(req, res) {
    try {
        await tipoDoacaoModel.deletar(req.params.id)
        res.status(204).send()
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: "Não é possível excluir: existem doações vinculadas a este tipo" })
        }
        res.status(500).json({ error: "Erro ao excluir tipo de doação" })
    }
}

module.exports = {
    listarTodos,
    buscar,
    criar,
    atualizar,
    deletar
}