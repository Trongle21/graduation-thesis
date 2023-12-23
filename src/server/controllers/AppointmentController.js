const Appointments = require("../models/Appointment");

const appointmentController = {
  // [POST] "api/appointment/store"
  store: async (req, res) => {
    try {
      const newAppointment = new Appointments(req.body);
      await newAppointment.save();

      return res.status(201).json(newAppointment);
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi thêm dữ liệu!" + err);
    }
  },
};

module.exports = appointmentController;
