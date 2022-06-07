const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");
const authValid = require("../middleware/auth-validator");

router.post("/signup", authValid.checkName, authValid.checkValid, authCtrl.signup);
router.post("/login", authValid.checkValid, authCtrl.login);

module.exports = router;