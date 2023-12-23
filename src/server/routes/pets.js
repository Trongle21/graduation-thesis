const express = require("express");
const router = express.Router();
const petsController = require("../controllers/PetsController");
const { verifyTokenAndAdmin } = require("../middleware/verifyTokenMiddleWare");

router.post("/store", petsController.store);
router.get("/:id/edit", verifyTokenAndAdmin, petsController.edit);
router.put("/:id", verifyTokenAndAdmin, petsController.update);
router.delete("/:id", verifyTokenAndAdmin, petsController.delete);
router.patch("/:id/restore", petsController.restore);

router.delete("/:id/force", verifyTokenAndAdmin, petsController.forceDelete);

router.post(
  "/handle-action-form",
  verifyTokenAndAdmin,
  petsController.handleActionForm
);


module.exports = router;
