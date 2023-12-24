const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

// Schema cho Dịch Vụ
const ServicePackSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      unique: true,
    },
    packages: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Thêm plugin
ServicePackSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

module.exports = mongoose.model("ServicePack", ServicePackSchema);
