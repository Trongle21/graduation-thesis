const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const ProductsSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    type: { type: String },
    price: { type: Number },
    quantityProduct: { type: Number },
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

module.exports = mongoose.model("Products", ProductsSchema);
