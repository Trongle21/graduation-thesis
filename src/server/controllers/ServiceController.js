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
};

module.exports = serviceController;
