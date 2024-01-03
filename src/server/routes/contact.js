const express = require("express");
const router = express.Router();
const contactController = require("../controllers/ContactController");
const { verifyTokenAndAdmin } = require("../middleware/verifyTokenMiddleWare");

router.post("/store", contactController.store);
router.delete("/:id", verifyTokenAndAdmin, contactController.delete);
router.put("/:id", verifyTokenAndAdmin, contactController.update);
router.patch("/:id/restore", contactController.restore);
router.delete("/:id/force", verifyTokenAndAdmin, contactController.forceDelete);
router.post("/handle-action-form", verifyTokenAndAdmin, contactController.handleActionForm);

module.exports = router;
