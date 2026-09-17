const express = require("express")
const router = express.Router()
const enderecoController = require("../controllers/enderecoController")                            

router.get("/", enderecoController.listarTodos)
router.get("/:id",enderecoController.buscar)
router.post("/", enderecoController.criar)
router.put("/:id", enderecoController.atualizar)
router.delete("/:id", enderecoController.deletar)

module.exports = router
