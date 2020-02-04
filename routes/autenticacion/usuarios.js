const express = require("express");

const UserController = require("../../controllers/auntenticacion/usuarios");
const checkAuth = require("../../middleware/check-auth");

const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
router.post("/logout", checkAuth, UserController.logout);
router.post("/refresh-token", UserController.refreshToken);



module.exports = router;