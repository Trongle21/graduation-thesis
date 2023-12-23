const express = require("express");
const router = express.Router();
const productsController = require("../controllers/ProductsController");
const { verifyTokenAndAdmin } = require("../middleware/verifyTokenMiddleWare");

router.get("/create", productsController.create);
router.post("/store", productsController.store);
router.get("/:slug", productsController.detail);
router.get("/:id/edit", verifyTokenAndAdmin, productsController.edit);
router.put("/:id", verifyTokenAndAdmin, productsController.update);
router.delete("/:id", verifyTokenAndAdmin, productsController.delete);
router.patch("/:id/restore", productsController.restore);
router.delete(
  "/:id/force",
  verifyTokenAndAdmin,
  productsController.forceDelete
);
router.post(
  "/handle-action-form",
  verifyTokenAndAdmin,
  productsController.handleActionForm
);
router.get("/", productsController.renderProducts);

module.exports = router;
