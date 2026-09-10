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
        const [id] = await doadorModel.criar(req.body)
        res.status(201).json({ id })
    }
    async function atualizar(req, res) {
        const [id] = await doadorModel.atualizar(req.params.id, req.body)
        res.json(doador)
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