const doacaoModel = require("../models/doacaoModel")

async function listarTodos(req, res) {
    const doacoes = await doacaoModel.listarTodos()
    res.json(doacoes)
}

async function buscar(req, res) {
    const doacao = await doacaoModel.buscarPorId(req.params.id)
    if (!doacao) return res.status(404).json({ error: "Doação não encontrada" })
    res.json(doacao)
}

async function criar(req, res) {
    try {
        const doacao = await doacaoModel.criar(req.body)
        res.status(201).json(doacao)
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ error: "doador_id, funcionario_id, tipo_doacao_id ou situacao_id inválido" })
        }
        res.status(500).json({ error: "Erro ao criar doação" })
    }
}

async function atualizar(req, res) {
    try {
        const doacao = await doacaoModel.atualizar(req.params.id, req.body)
        if (!doacao) return res.status(404).json({ error: "Doação não encontrada" })
        res.json(doacao)
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ error: "doador_id, funcionario_id, tipo_doacao_id ou situacao_id inválido" })
        }
        res.status(500).json({ error: "Erro ao atualizar doação" })
    }
}

async function deletar(req, res) {
    await doacaoModel.deletar(req.params.id)
    res.status(204).send()
}

module.exports = {
    listarTodos,
    buscar,
    criar,
    atualizar,
    deletar
}