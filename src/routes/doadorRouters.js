const express = require("express");
const router = express.Router();
const doadorController = require("../controllers/doadorController")

router.get("/", doadorController.listarTodos);
router.get("/:id", doadorController.buscar);
router.post("/", doadorController.criar);
router.put("/:id", doadorController.atualizar);
router.delete("/:id", doadorController.deletar);

module.exports = router;