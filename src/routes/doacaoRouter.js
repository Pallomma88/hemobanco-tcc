const express = require("express");
const router = express.Router();
const doacaoController = require("../controllers/doacaoController")

router.get("/", doacaoController.listarTodos);
router.get("/:id", doacaoController.buscar);
router.post("/", doacaoController.criar);
router.put("/:id", doacaoController.atualizar);
router.delete("/:id", doacaoController.deletar);

module.exports = router;