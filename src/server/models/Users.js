const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UsersSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      require: true,
      unique: true,
    },
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
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
// Thêm plugin
UsersSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});


// Tạo userId tự động
UsersSchema.pre("save", async function (next) {
  if (!this.userId) {
    const lastUser = await this.constructor.findOne(
      {},
      {},
      { sort: { userId: -1 } }
    );
    this.userId = (lastUser && lastUser.userId + 1) || 1;
  }
  next();
});

module.exports = mongoose.model("Users", UsersSchema);
