const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const { verifyToken, verifyTokenAndAdmin} = require("../middleware/verifyTokenMiddleWare");

router.get("/login", authController.login);
router.get("/signUp", authController.signUp);
router.post("/login", authController.loginUser);
router.post("/refresh", authController.requestRefreshToken);
router.post("/logout", verifyToken, authController.logoutUser);

module.exports = router;
