const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.delete("/:id", auth, userCtrl.deleteUser);
router.get("/:id", auth, userCtrl.getOneUser);

module.exports = router;