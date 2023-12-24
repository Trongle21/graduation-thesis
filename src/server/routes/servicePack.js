const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/ServiceController");
const { verifyTokenAndAdmin } = require("../middleware/verifyTokenMiddleWare");

router.post("/store", serviceController.store);
router.get("/:id/edit", verifyTokenAndAdmin, serviceController.edit);
router.put("/:id", verifyTokenAndAdmin, serviceController.update);
router.delete("/:id", verifyTokenAndAdmin, serviceController.delete);
router.patch("/:id/restore", serviceController.restore);

router.delete("/:id/force", verifyTokenAndAdmin, serviceController.forceDelete);

router.post(
  "/handle-action-form",
  verifyTokenAndAdmin,
  serviceController.handleActionForm
);

module.exports = router;
