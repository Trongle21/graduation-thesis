const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/AppointmentController");

router.post("/store", appointmentController.store);

module.exports = router;
