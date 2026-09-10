const express = require("express")

const testRoutes = require("./routes/testRoutes")
const doadorRoutes = require("./routes/doadorRouters")

const app = express()

app.use(express.json())

app.use("/test", testRoutes)
app.use("/doadores", doadorRoutes)

app.get("/", (req, res) => {
    res.send("API Hemobanco funcionando!")
})

module.exports = app