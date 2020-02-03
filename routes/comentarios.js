const express = require("express");

const comentariosController = require("../controllers/comentarios");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

router.post("/", checkAuth, comentariosController.crear);
router.get("/", checkAuth, comentariosController.obtener);
router.put("/", checkAuth, comentariosController.actualizar);
router.delete("/:id", checkAuth, comentariosController.eliminar);

module.exports = router;