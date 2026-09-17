const express = require("express")
const router = express.Router()
const tipoBloqueioController = require("../controllers/tipoBloqueioController")

router.get("/", tipoBloqueioController.listarTodos)
router.get("/:id", tipoBloqueioController.buscar)
router.post("/", tipoBloqueioController.criar)
router.put("/:id", tipoBloqueioController.atualizar)
router.delete("/:id", tipoBloqueioController.deletar)

module.exports = router