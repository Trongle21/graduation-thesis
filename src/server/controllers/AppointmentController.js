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
  // [DELETE] "api/appointments/:id"
  delete: async (req, res) => {
    try {
      await Appointments.delete({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(Error);
    }
  },

  // [PUT] "api/appointments/:id"
  update: async (req, res) => {
    try {
      await Appointments.updateOne({ _id: req.params.id }, { $set: req.body });
      res.send("update thành công!");
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // [PATCH] "api/appointments/:id/restore"
  restore: async (req, res) => {
    try {
      await Appointments.restore({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  // [DELETE] "api/appointments/:id/force"
  forceDelete: async (req, res) => {
    try {
      await Appointments.deleteOne({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  handleActionForm: async (req, res) => {
    try {
      switch (req.body.action) {
        case "delete":
          await Appointments.delete({ _id: { $in: req.body.appointmentId } });
          await res.redirect("back");
          break;
        case "restore":
          await Appointments.restore({ _id: { $in: req.body.appointmentId } });
          await res.redirect("back");
          break;
        case "forceDelete":
          await Appointments.deleteMany({
            _id: { $in: req.body.appointmentId },
          });
          await res.redirect("back");
          break;
        default:
          res.send("Lỗi");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = appointmentController;
