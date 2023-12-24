const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/AppointmentController");
const { verifyTokenAndAdmin } = require("../middleware/verifyTokenMiddleWare");

router.post("/store", appointmentController.store);

router.delete("/:id", verifyTokenAndAdmin, appointmentController.delete);
router.patch("/:id/restore", appointmentController.restore);

router.delete(
  "/:id/force",
  verifyTokenAndAdmin,
  appointmentController.forceDelete
);

router.post(
  "/handle-action-form",
  verifyTokenAndAdmin,
  appointmentController.handleActionForm
);

module.exports = router;
