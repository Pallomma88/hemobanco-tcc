const instituicaoModel = require("../models/instituicaoModel")

async function listarTodos(req, res) {
    const instituicoes = await instituicaoModel.listarTodos()
    res.json(instituicoes)
}

async function buscar(req, res) {
    const instituicao = await instituicaoModel.buscarPorId(req.params.id)
    if (!instituicao) return res.status(404).json({ error: "Instituição não encontrada" })
    res.json(instituicao)
}

async function criar(req, res) {
    try {
        const instituicao = await instituicaoModel.criar(req.body)
        res.status(201).json(instituicao)
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: "endereco_id inválido ou cnpj já cadastrado" })
        }
        res.status(400).json({ error: "Não foi possível criar a instituição" })
    }
}

async function atualizar(req, res) {
    try {
        const instituicao = await instituicaoModel.atualizar(req.params.id, req.body)
        if (!instituicao) return res.status(404).json({ error: "Instituição não encontrada" })
        res.json(instituicao)
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: "endereco_id inválido ou cnpj já cadastrado" })
        }
        res.status(400).json({ error: "Não foi possível atualizar a instituição" })
    }
}

async function deletar(req, res) {
    try {
        await instituicaoModel.deletar(req.params.id)
        res.status(204).send()
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: "Não é possível excluir: existem registros vinculados a esta instituição" })
        }
        res.status(500).json({ error: "Erro ao excluir instituição" })
    }
}

module.exports = {
    listarTodos,
    buscar,
    criar,
    atualizar,
    deletar
}