const express = require("express")
const router = express.Router()
const tipoSanguineoController = require("../controllers/tipoSanguineoController")

router.get("/", tipoSanguineoController.listarTodos)
router.get("/:id", tipoSanguineoController.buscar)
router.post("/", tipoSanguineoController.criar)
router.put("/:id", tipoSanguineoController.atualizar)
router.delete("/:id", tipoSanguineoController.deletar)

module.exports = router 