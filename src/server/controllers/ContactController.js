const Contact = require("../models/Contact");

const contactController = {
  // [POST] "api/Contact/store"
  store: async (req, res) => {
    try {
      const newContact = new Contact(req.body);
      await newContact.save();
      return res.status(201).json(newContact);
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi thêm dữ liệu!" + err);
    }
  },
  // [DELETE] "api/Contact/:id"
  delete: async (req, res) => {
    try {
      await Contact.delete({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(Error);
    }
  },

  // [PUT] "api/contact/:id"
  update: async (req, res) => {
    try {
      await Contact.updateOne({ _id: req.params.id }, { $set: req.body });
      res.send("update thành công!");
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // [PATCH] "api/Contact/:id/restore"
  restore: async (req, res) => {
    try {
      await Contact.restore({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  // [DELETE] "api/Contact/:id/force"
  forceDelete: async (req, res) => {
    try {
      await Contact.deleteOne({ _id: req.params.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  handleActionForm: async (req, res) => {
    try {
      switch (req.body.action) {
        case "delete":
          await Contact.delete({ _id: { $in: req.body.contactId } });
          await res.redirect("back");
          break;
        case "restore":
          await Contact.restore({ _id: { $in: req.body.contactId } });
          await res.redirect("back");
          break;
        case "forceDelete":
          await Contact.deleteMany({ _id: { $in: req.body.contactId } });
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

module.exports = contactController;
