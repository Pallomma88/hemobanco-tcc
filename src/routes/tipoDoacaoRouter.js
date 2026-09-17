const express = require("express")
const router = express.Router()
const tipoDoacaoController = require("../controllers/tipoDoacaoController")

router.get("/", tipoDoacaoController.listarTodos)
router.get("/:id", tipoDoacaoController.buscar)
router.post("/", tipoDoacaoController.criar)
router.put("/:id", tipoDoacaoController.atualizar)
router.delete("/:id", tipoDoacaoController.deletar)

module.exports = router