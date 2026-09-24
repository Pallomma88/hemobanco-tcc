const express = require("express")

const testRoutes = require("./routes/testRoutes")
const doadorRoutes = require("./routes/doadorRouters")
const tipoSanguineoRoutes = require("./routes/tipoSanguineoRouter")
const enderecoRoutes = require("./routes/enderecoRouter")
const instituicaoRoutes = require("./routes/instituicaoRouter")
const funcionarioRoutes = require("./routes/funcionarioRouter")
const tipoDoadorRouter = require("./routes/tipoDoacaoRouter")
const tipoBloqueioRoutes = require("./routes/tipoBloqueioRouter")
const situacaoRoutes = require("./routes/situacaoRouter")
const doacaoRoutes = require("./routes/doacaoRouter")

const app = express()

app.use(express.json())

app.use("/test", testRoutes)
app.use("/doadores", doadorRoutes)
app.use("/tipos-sanguineos", tipoSanguineoRoutes)
app.use("/enderecos", enderecoRoutes)
app.use("/instituicoes", instituicaoRoutes)
app.use("/funcionarios", funcionarioRoutes)
app.use("/tipos-doacao", tipoDoadorRouter)
app.use("/tipos-bloqueio", tipoBloqueioRoutes)
app.use("/situacoes", situacaoRoutes)
app.use("/doacoes", doacaoRoutes)

app.get("/", (req, res) => {
    res.send("API Hemobanco funcionando!")
})

module.exports = app
