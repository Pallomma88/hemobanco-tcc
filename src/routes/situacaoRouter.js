const express = require("express");
const router = express.Router();
const situacaoController = require("../controllers/situacaoController")

router.get("/", situacaoController.listarTodos);
router.get("/:id", situacaoController.buscar);
router.post("/", situacaoController.criar);
router.put("/:id", situacaoController.atualizar);
router.delete("/:id", situacaoController.deletar);

module.exports = router;