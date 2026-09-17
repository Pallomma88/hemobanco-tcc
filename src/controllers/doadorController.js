const doadorModel = require("../models/doadorModel")

async function listarTodos(req, res) {
    const doadores = await doadorModel.listarTodos()
    res.json(doadores)
    }

    async function buscar(req, res) {
        const doador = await doadorModel.buscarPorId(req.params.id)
        if (!doador) return res.status(404).json({ error: "Doador não encontrado" })
            res.json(doador)
    }

    async function criar(req, res) {
        try {
            const doador = await doadorModel.criar(req.body)
            res.status(201).json(doador)
        } catch (error) {
            if (error.code === 'SQLITE_CONSTRAINT') {
                return res.status(400).json({ error: "tipo_sanguineo_id ou endereco_id inválido" })
            }
            res.status(500).json({ error: "Erro ao criar doador" })
     }
    }
    async function atualizar(req, res) {
        try {
        const doador = await doadorModel.atualizar(req.params.id, req.body)
        if (!doador) return res.status(404).json({ error: "Doador não encontrado" })
        res.json(doador)
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ error: "tipo_sanguineo_id ou endereco_id inválido" })
        }
        res.status(500).json({ error: "Erro ao atualizar doador" })
    }
}
async function deletar(req, res) {
    await doadorModel.deletar(req.params.id)
    res.status(204).send()
}

module.exports = {
    listarTodos,
    buscar,
    criar,
    atualizar,
    deletar
}