const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 40,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    address: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UsersSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

module.exports = mongoose.model("Users", UsersSchema);
