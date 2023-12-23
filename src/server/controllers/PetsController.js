const Pets = require("../models/Pets");

const petsController = {
  // [POST] "api/pets/store"
  store: async (req, res) => {
    try {
      const newPet = new Pets(req.body);
      await newPet.save();

      return res.status(201).json(newPet);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
  // [GET] "api/pets/:id/edit"
  edit: async (req, res) => {
    try {
      await Pets.findById({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  //   [PUT] "api/pets/:id"
  update: async (req, res) => {
    try {
      await Pets.updateOne({ _id: req.params.id }, req.body);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  // [DELETE] "api/pets/:id"
  delete: async (req, res) => {
    try {
      await Pets.delete({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(Error);
    }
  },

  // [PATCH] "api/pets/:id/restore"
  restore: async (req, res) => {
    try {
      await Pets.restore({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  // [DELETE] "api/pets/:id/force"
  forceDelete: async (req, res) => {
    try {
      await Pets.deleteOne({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  handleActionForm: async (req, res) => {
    try {
      switch (req.body.action) {
        case "delete":
          await Pets.delete({ _id: { $in: req.body.petId } });
          await res.redirect("back");
          break;
        case "restore":
          await Pets.restore({ _id: { $in: req.body.petId } });
          await res.redirect("back");
          break;
        case "forceDelete":
          await Pets.deleteMany({ _id: { $in: req.body.petId } });
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

module.exports = petsController;
