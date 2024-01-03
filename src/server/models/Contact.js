const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const ContactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    subject: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    response: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

ContactSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

module.exports = mongoose.model("Contacts", ContactSchema);
