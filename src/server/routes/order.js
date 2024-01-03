const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const { verifyTokenAndAdmin } = require("../middleware/verifyTokenMiddleWare");

router.post("/store", orderController.store);
router.delete("/:id", verifyTokenAndAdmin, orderController.delete);
router.put("/:id", verifyTokenAndAdmin, orderController.update);
router.patch("/:id/restore", orderController.restore);
router.delete("/:id/force", verifyTokenAndAdmin, orderController.forceDelete);
router.post("/handle-action-form", verifyTokenAndAdmin, orderController.handleActionForm);

module.exports = router;
