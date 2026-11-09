const swaggerUi = require("swagger-ui-express")
const openapi = require("./openapi")

function setupSwagger(app) {
  app.get("/openapi.json", (req, res) => {
    res.json(openapi)
  })

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(openapi, {
      customSiteTitle: "API Hemobanco — Swagger",
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
      },
    })
  )
}

module.exports = setupSwagger
