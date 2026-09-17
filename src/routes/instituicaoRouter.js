const express = require("express")
const router = express.Router()
const instituicaoController = require("../controllers/instituicaoController")

router.get("/", instituicaoController.listarTodos)
router.get("/:id", instituicaoController.buscar)
router.post("/", instituicaoController.criar)
router.put("/:id", instituicaoController.atualizar)
router.delete("/:id", instituicaoController.deletar)

module.exports = router