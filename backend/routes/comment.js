const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/", auth, commentCtrl.createComment);
router.put("/:id", auth, commentCtrl.updateComment);
router.delete("/:id", auth, commentCtrl.deleteComment);
router.get("/:id", auth, commentCtrl.getOneComment);
router.get("/", auth, commentCtrl.getAllComments);

module.exports = router;