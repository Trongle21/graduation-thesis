const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/AppointmentController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyTokenMiddleWare");

router.post("/store", appointmentController.store);
router.put("/:id", verifyTokenAndAdmin, appointmentController.update);
router.delete("/:id", verifyTokenAndUserAuthorization, appointmentController.delete);
router.patch("/:id/restore", appointmentController.restore);
router.delete(
  "/:id/force",
  verifyTokenAndUserAuthorization,
  appointmentController.forceDelete
);
router.post(
  "/handle-action-form",
  verifyTokenAndAdmin,
  appointmentController.handleActionForm
);

module.exports = router;
