const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyTokenMiddleWare");

router.post("/store", orderController.store);
router.delete("/:id", verifyTokenAndUserAuthorization, orderController.delete);
router.put("/:id", verifyTokenAndAdmin, orderController.update);
router.patch("/:id/restore", orderController.restore);
router.delete(
  "/:id/force",
  verifyTokenAndUserAuthorization,
  orderController.forceDelete
);
router.post(
  "/handle-action-form",
  verifyTokenAndAdmin,
  orderController.handleActionForm
);

module.exports = router;
