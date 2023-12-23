const express = require("express");
const router = express.Router();
const usersController = require("../controllers/UsersController");
const { verifyTokenAndAdmin } = require("../middleware/verifyTokenMiddleWare");

router.post("/store", usersController.store);
router.get("/:id/edit", verifyTokenAndAdmin, usersController.edit);
router.put("/:id", verifyTokenAndAdmin, usersController.update);
router.delete("/:id", verifyTokenAndAdmin, usersController.delete);
router.patch("/:id/restore", usersController.restore);

router.delete("/:id/force", verifyTokenAndAdmin, usersController.forceDelete);

router.post(
  "/handle-action-form",
  verifyTokenAndAdmin,
  usersController.handleActionForm
);

module.exports = router;
