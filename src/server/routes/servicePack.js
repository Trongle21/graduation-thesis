const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/ServiceController");

router.post("/store", serviceController.store);

module.exports = router;
