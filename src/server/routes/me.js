const express = require("express");
const router = express.Router();
const meController = require("../controllers/MeController");

const { verifyToken } = require("../middleware/verifyTokenMiddleWare");

router.get("/stored/products", meController.storedProducts);
router.get("/trash/products", meController.trashProducts);
router.get("/stored/users", meController.storedUsers);
router.get("/trash/users", meController.trashUsers);
router.get("/stored/pets", meController.storedPets);
router.get("/trash/pets", meController.trashPets);
router.get("/stored/service-pack", meController.storedServicePack);
router.get("/trash/service-pack", meController.trashServicePack);
router.get("/stored/appointments", meController.storedAppointments);
router.get("/trash/appointments", meController.trashAppointment);
router.get("/stored/order", meController.storedOrder);
router.get("/trash/order", meController.trashOrder);
router.get("/stored/contact", meController.storedContact);
router.get("/trash/contact", meController.trashContact);

module.exports = router;
