const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

// Schema cho Dịch Vụ
const ServicePackSchema = new mongoose.Schema(
  {
    servicePackId: {
      type: Number,
      require: true,
      unique: true,
    },
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

// Tạo servicePackId tự động
ServicePackSchema.pre("save", async function (next) {
  if (!this.servicePackId) {
    const lastServicePack = await this.constructor.findOne(
      {},
      {},
      { sort: { servicePackId: -1 } }
    );
    this.servicePackId = (lastServicePack && lastServicePack.servicePackId + 1) || 1;
  }
  next();
});

module.exports = mongoose.model("ServicePack", ServicePackSchema);
