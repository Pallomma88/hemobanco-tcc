const express = require("express")
const router = express.Router()
const funcionarioController = require("../controllers/funcionarioController")

router.get("/", funcionarioController.listarTodos)
router.get("/:id", funcionarioController.buscar)
router.post("/", funcionarioController.criar)
router.put("/:id", funcionarioController.atualizar)
router.delete("/:id", funcionarioController.deletar)

module.exports = router