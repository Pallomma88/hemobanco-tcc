const doacaoModel = require("../models/doacaoModel")
const doadorModel = require("../models/doadorModel")
const situacaoModel = require("../models/situacaoModel")

// intervalo mínimo (em dias) entre doações, por sexo do doador
const INTERVALO_MINIMO_DIAS = { M: 60, F: 90 }

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
    const { data_doacao, doador_id } = req.body

    if (!data_doacao || isNaN(new Date(data_doacao))) {
        return res.status(400).json({ error: "data_doacao é obrigatória e precisa ser uma data válida" })
    }

    if (new Date(data_doacao) > new Date()) {
        return res.status(400).json({ error: "data_doacao não pode ser uma data futura" })
    }

    if (doador_id) {
        const doador = await doadorModel.buscarPorId(doador_id)
        if (!doador) {
            return res.status(400).json({ error: "doador_id inválido" })
        }

        // Doador bloqueado: situacao_id aponta pra uma situação com tipo_bloqueio_id
        // preenchido, e o bloqueio ainda não venceu (sem data_limite, ou data_limite no futuro)
        if (doador.situacao_id) {
            const situacao = await situacaoModel.buscarPorId(doador.situacao_id)
            if (situacao && situacao.tipo_bloqueio_id) {
                const bloqueioAtivo = !situacao.data_limite || new Date(situacao.data_limite) >= new Date(data_doacao)
                if (bloqueioAtivo) {
                    return res.status(400).json({
                        error: `Doador está bloqueado para doação: ${situacao.motivo || situacao.descricao}${situacao.data_limite ? ` (até ${situacao.data_limite})` : ""}`
                    })
                }
            }
        }

        const ultimaDoacao = await doacaoModel.buscarUltimaDoacaoDoDoador(doador_id)
        if (ultimaDoacao) {
            const diasMinimos = INTERVALO_MINIMO_DIAS[doador.sexo] || 60
            const diasDesdeUltima = (new Date(data_doacao) - new Date(ultimaDoacao.data_doacao)) / (1000 * 60 * 60 * 24)

            if (diasDesdeUltima < diasMinimos) {
                return res.status(400).json({
                    error: `Doador precisa aguardar ${diasMinimos} dias entre doações. Última doação foi há ${Math.floor(diasDesdeUltima)} dia(s).`
                })
            }
        }
    }

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
    if (req.body.data_doacao && new Date(req.body.data_doacao) > new Date()) {
        return res.status(400).json({ error: "data_doacao não pode ser uma data futura" })
    }

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