const funcionarioModel = require("../models/funcionarioModel")

async function listarTodos(req, res) {
    const funcionarios = await funcionarioModel.listarTodos()
    res.json(funcionarios)
}

async function buscar(req, res) {
    const funcionario = await funcionarioModel.buscarPorId(req.params.id)
    if (!funcionario) return res.status(404).json({ error: "Funcionário não encontrado" })
    res.json(funcionario)
}

async function criar(req, res) {
    try {
        const funcionario = await funcionarioModel.criar(req.body)
        res.status(201).json(funcionario)
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: "instituicao_id inválido ou matrícula já cadastrada" })
        }
        res.status(400).json({ error: "Não foi possível criar o funcionário" })
    }
}

async function atualizar(req, res) {
    try {
        const funcionario = await funcionarioModel.atualizar(req.params.id, req.body)
        if (!funcionario) return res.status(404).json({ error: "Funcionário não encontrado" })
        res.json(funcionario)
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: "instituicao_id inválido ou matrícula já cadastrada" })
        }
        res.status(400).json({ error: "Não foi possível atualizar o funcionário" })
    }
}

async function deletar(req, res) {
    try {
        await funcionarioModel.deletar(req.params.id)
        res.status(204).send()
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: "Não é possível excluir: existem registros vinculados a este funcionário" })
        }
        res.status(500).json({ error: "Erro ao excluir funcionário" })
    }
}

module.exports = {
    listarTodos,
    buscar,
    criar,
    atualizar,
    deletar
}