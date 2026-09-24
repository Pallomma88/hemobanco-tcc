const situacaoModel = require("../models/situacaoModel")

async function listarTodos(req, res) {
    const situacoes = await situacaoModel.listarTodos()
    res.json(situacoes)
}

async function buscar(req, res) {
    const situacao = await situacaoModel.buscarPorId(req.params.id)
    if (!situacao) return res.status(404).json({ error: "Situação não encontrada" })
    res.json(situacao)
}

async function criar(req, res) {
    try {
        const situacao = await situacaoModel.criar(req.body)
        res.status(201).json(situacao)
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ error: "tipo_bloqueio_id ou doador_id inválido" })
        }
        res.status(500).json({ error: "Erro ao criar situação" })
    }
}

async function atualizar(req, res) {
    try {
        const situacao = await situacaoModel.atualizar(req.params.id, req.body)
        if (!situacao) return res.status(404).json({ error: "Situação não encontrada" })
        res.json(situacao)
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ error: "tipo_bloqueio_id ou doador_id inválido" })
        }
        res.status(500).json({ error: "Erro ao atualizar situação" })
    }
}

async function deletar(req, res) {
    await situacaoModel.deletar(req.params.id)
    res.status(204).send()
}

module.exports = {
    listarTodos,
    buscar,
    criar,
    atualizar,
    deletar
}