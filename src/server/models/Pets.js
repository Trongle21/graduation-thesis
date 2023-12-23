const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const PetsSchema = new mongoose.Schema(
  {
    petId: {
      type: Number,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

// Thêm plugin
PetsSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

// Tạo petId tự động
PetsSchema.pre("save", async function (next) {
  if (!this.petId) {
    const lastUser = await this.constructor.findOne(
      {},
      {},
      { sort: { petId: -1 } }
    );
    this.petId = (lastUser && lastUser.petId + 1) || 1;
  }
  next();
});

module.exports = mongoose.model("Pets", PetsSchema);
