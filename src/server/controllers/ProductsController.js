const Products = require("../models/Products.js");

const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../until/mongoose");

const productsController = {
  // [GET] "api/products"
  renderProducts: async (req, res) => {
    try {
      const products = await Products.find({});
      await res.send({ products: multipleMongooseToObject(products) });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // [GET] "api/v4/product/:slug"
  detail: async (req, res) => {
    try {
      const product = await Products.findById(req.params.slug);
      await res.send({
        product: mongooseToObject(product),
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // [GET] "api/v4/products/create"
  create: async (req, res) => {
    try {
      await res.send("Trang thêm sản phẩm!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // [POST] "api/products/create"
  store: async (req, res) => {
    try {
      const { name, type, price, description, detail, thumbnail, images } =
        req.body;

      console.log(thumbnail);

      const newProduct = new Products({
        name,
        type,
        price,
        description,
        detail,
        thumbnail,
        images,
      });

      await newProduct.save();

      res.send("Thêm thành công!");
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // [GET] "api/products/:id/edit"
  edit: async (req, res) => {
    try {
      const product = await Products.findById({ _id: req.params.id });
      await res.send({ product: mongooseToObject(product) });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // [PUT] "api/products/:id"
  update: async (req, res) => {
    try {
      await Products.updateOne({ _id: req.params.id }, { $set: req.body });
    
      res.send("update thành công!");
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // [DELETE] "api/products/:id"
  delete: async (req, res) => {
    try {
      await Products.delete({ _id: req.params.id });
      await res.redirect("back");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // [PATCH] "api/products/:id/restore"
  restore: async (req, res) => {
    try {
      await Products.restore({ _id: req.params.id });
      await res.redirect("back");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // [DELETE] "api/products/:id/force"
  forceDelete: async (req, res) => {
    try {
      await Products.deleteOne({ _id: req.params.id });
      await res.redirect("back");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // [POST] "api/v4/products/handle-action-form"
  handleActionForm: async (req, res) => {
    try {
      switch (req.body.action) {
        case "delete":
          await Products.delete({ _id: { $in: req.body.productId } });
          await res.redirect("back");
          break;
        case "restore":
          await Products.restore({ _id: { $in: req.body.productId } });
          await res.redirect("back");
          break;
        case "forceDelete":
          await Products.deleteMany({ _id: { $in: req.body.productId } });
          await res.redirect("back");
          break;
        default:
          res.send("Lỗi");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = productsController;
