const express = require("express");
const router = express.Router();
const usersController = require("../controllers/UsersController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyTokenMiddleWare");

router.post("/store", usersController.store);
router.get("/:id/edit", verifyTokenAndUserAuthorization, usersController.edit);
router.put("/:id", verifyTokenAndUserAuthorization, usersController.update);
router.put("/:id/change-password", verifyTokenAndUserAuthorization, usersController.changePassword);
router.delete("/:id", verifyTokenAndAdmin, usersController.delete);
router.patch("/:id/restore", usersController.restore);

router.delete("/:id/force", verifyTokenAndAdmin, usersController.forceDelete);

router.post(
  "/handle-action-form",
  verifyTokenAndAdmin,
  usersController.handleActionForm
);

module.exports = router;
