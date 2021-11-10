const {
  handleLogin,
  handleRegister,
} = require("../controller/users.controller");

const router = require("express").Router();

router.post("/login", handleLogin);

router.post("/register", handleRegister);

module.exports = router;
