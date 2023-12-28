const Order = require("../models/Order");

const orderController = {
  // [POST] "api/Order/store"
  store: async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      return res.status(201).json(newOrder);
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi thêm dữ liệu!" + err);
    }
  },
  // [DELETE] "api/Order/:id"
  delete: async (req, res) => {
    try {
      await Order.delete({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(Error);
    }
  },

  // [PUT] "api/order/:id"
  update: async (req, res) => {
    try {
      await Order.updateOne({ _id: req.params.id }, { $set: req.body });
      res.send("update thành công!");
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // [PATCH] "api/Order/:id/restore"
  restore: async (req, res) => {
    try {
      await Order.restore({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  // [DELETE] "api/Order/:id/force"
  forceDelete: async (req, res) => {
    try {
      await Order.deleteOne({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  handleActionForm: async (req, res) => {
    try {
      switch (req.body.action) {
        case "delete":
          await Order.delete({ _id: { $in: req.body.orderId } });
          await res.redirect("back");
          break;
        case "restore":
          await Order.restore({ _id: { $in: req.body.orderId } });
          await res.redirect("back");
          break;
        case "forceDelete":
          await Order.deleteMany({ _id: { $in: req.body.orderId } });
          await res.redirect("back");
          break;
        default:
          res.send("Lỗi");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = orderController;
