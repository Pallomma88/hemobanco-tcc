const tipoSanguineoModel = require("../models/tipoSanguineoModel")

async function listarTodos(req, res) {
    const tipos = await tipoSanguineoModel.listarTodos()
    res.json(tipos)
}

async function buscar(req, res) {
    const tipo = await tipoSanguineoModel.buscarPorId(req.params.id)
    if (!tipo) return res.status(404).json({ error: "Tipo sanguíneo não encontrado" })
    res.json(tipo)
}

async function criar(req, res) {
    try {
        const tipo = await tipoSanguineoModel.criar(req.body)
        res.status(201).json(tipo)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível criar o tipo sanguíneo" })   
    }
}

async function atualizar(req, res) {
    try {
        const tipo = await tipoSanguineoModel.atualizar(req.params.id, req.body)
        if (!tipo) return res.status(404).json({ error: "Tipo sanguíneo não encontrado" })
        res.json(tipo)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível atualizar o tipo sanguíneo" })
    }
}  

async function deletar(req, res) {
    try {
    await tipoSanguineoModel.deletar(req.params.id)
    res.status(204).send()
}   catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
        return res.status(400).json({ error: "Não é possível excluir: existem doadores vinculados a este tipo sanguíneo" })
    }
    res.status(500).json({ error: "Erro ao excluir o tipo sanguíneo" })
    } 
}

module.exports = {
    listarTodos,
    buscar,         
    criar,
    atualizar,
    deletar
}
