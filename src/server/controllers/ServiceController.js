const ServicePack = require("../models/ServicePack");

const serviceController = {
  // [POST] "api/service/store"
  store: async (req, res) => {
    try {
      const newService = new ServicePack(req.body);
      await newService.save();
      return res.status(201).json(newService);
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi thêm dữ liệu!" + err);
    }
  },

  // [GET] "api/servicePack/:id/edit"
  edit: async (req, res) => {
    try {
      await ServicePack.findById({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  //   [PUT] "api/servicePack/:id"
  update: async (req, res) => {
    try {
      await ServicePack.updateOne({ _id: req.params.id }, req.body);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  // [DELETE] "api/servicePack/:id"
  delete: async (req, res) => {
    try {
      await ServicePack.delete({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(Error);
    }
  },

  // [PATCH] "api/servicePack/:id/restore"
  restore: async (req, res) => {
    try {
      await ServicePack.restore({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  // [DELETE] "api/servicePack/:id/force"
  forceDelete: async (req, res) => {
    try {
      await ServicePack.deleteOne({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  handleActionForm: async (req, res) => {
    console.log(req.body.action);
    try {
      switch (req.body.action) {
        case "delete":
          await ServicePack.delete({ _id: { $in: req.body.servicePackListId } });
          await res.redirect("back");
          break;
        case "restore":
          await ServicePack.restore({ _id: { $in: req.body.servicePackListId } });
          await res.redirect("back");
          break;
        case "forceDelete":
          await ServicePack.deleteMany({ _id: { $in: req.body.servicePackListId } });
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

module.exports = serviceController;
