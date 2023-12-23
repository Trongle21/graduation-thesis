const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const AppointmentSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pets",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service.packages",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Thêm plugin
AppointmentSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

// Tạo appointmentId tự động
AppointmentSchema.pre("save", async function (next) {
  if (!this.appointmentId) {
    const lastAppointment = await this.constructor.findOne(
      {},
      {},
      { sort: { appointmentId: -1 } }
    );
    this.appointmentId =
      (lastAppointment && lastAppointment.appointmentId + 1) || 1;
  }
  next();
});

module.exports = mongoose.model("Appointments", AppointmentSchema);
