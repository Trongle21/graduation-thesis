const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const ProductsSchema = new mongoose.Schema(
  {
    productId: { type: Number, require: true, unique: true },
    name: { type: String, require: true },
    type: { type: String },
    price: { type: Number },
    quantityProduct: [{ type: Number }],
    description: { type: String },
    detail: { type: String },
    thumbnail: { type: String },
    images: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Thêm plugin
ProductsSchema.plugin(slug);

ProductsSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

// Tạo productId tự động
ProductsSchema.pre("save", async function (next) {
  if (!this.productId) {
    const lastUser = await this.constructor.findOne(
      {},
      {},
      { sort: { productId: -1 } }
    );
    this.productId = (lastUser && lastUser.productId + 1) || 1;
  }
  next();
});

module.exports = mongoose.model("Products", ProductsSchema);
