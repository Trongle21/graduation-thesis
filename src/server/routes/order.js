const express = require("express");
const router = express.Router();
const order = require("../controllers/OrderController");
const { verifyTokenAndAdmin } = require("../middleware/verifyTokenMiddleWare");

router.post("/store", order.store);
router.delete("/:id", verifyTokenAndAdmin, order.delete);
router.patch("/:id/restore", order.restore);
router.delete("/:id/force", verifyTokenAndAdmin, order.forceDelete);
router.post("/handle-action-form", verifyTokenAndAdmin, order.handleActionForm);

module.exports = router;
