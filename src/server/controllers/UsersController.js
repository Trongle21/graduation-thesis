const Users = require("../models/Users");
const { mongooseToObject } = require("../until/mongoose");
const bcrypt = require("bcrypt");

const usersController = {
  // [POST] "api/users/store"
  store: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(4);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      await newUser.save();
      res.send("Thêm người dùng mới thành công!");
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi thêm dữ liệu!");
    }
  },

  // [GET] "api/users/:id/edit"
  edit: async (req, res) => {
    try {
      console.log(1);
      const user = await Users.findById({ _id: req.params.id });
      await res.send({ user: mongooseToObject(user) });
    } catch (err) {
      res.status(500).send("Không tìm thấy người dùng!");
    }
  },

  //   [PUT] "api/users/:id"
  update: async (req, res) => {
    try {
      const { username, email, address, phoneNumber } = req.body;
      const updateUser = { username, email, address, phoneNumber };
      const data = await Users.updateOne({ _id: req.params.id }, updateUser);
      console.log("Update thành công");
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi update!");
    }
  },

  changePassword: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const updateUser = { username, email, password };
      const salt = await bcrypt.genSalt(4);
      const hashed = await bcrypt.hash(password, salt);
      updateUser.password = hashed;
      await Users.updateOne({ _id: req.params.id }, updateUser);
      res.send("Update thành công");
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi update!");
    }
  },

  // [DELETE] "api/users/:id"
  delete: async (req, res) => {
    try {
      await Users.delete({ _id: req.params.id });
      await res.send("Xóa thành công");
    } catch (err) {
      res.status(500).send("Lỗi khi xóa!");
    }
  },

  // [PATCH] "api/users/:id/restore"
  restore: async (req, res) => {
    try {
      await Users.restore({ _id: req.params.id });
      await res.send("Khôi phục thành công");
    } catch (err) {
      res.status(500).send("Lỗi khi khôi phục người dùng!");
    }
  },

  // [DELETE] "api/users/:id/force"
  forceDelete: async (req, res) => {
    try {
      await Users.deleteOne({ _id: req.params.id });
      await res.send("Xóa vĩnh viễn thành công");
    } catch (err) {
      res.status(500).send("Lỗi khi xóa vĩnh viễn người dùng!");
    }
  },

  handleActionForm: async (req, res) => {
    try {
      switch (req.body.action) {
        case "delete":
          await Users.delete({ _id: { $in: req.body.userId } });
          await res.redirect("back");
          break;
        case "restore":
          await Users.restore({ _id: { $in: req.body.userId } });
          await res.redirect("back");
          break;
        case "forceDelete":
          await Users.deleteMany({ _id: { $in: req.body.userId } });
          await res.redirect("back");
          break;
        default:
          res.send("Lỗi");
      }
    } catch (err) {
      res.status(500).send("Lỗi!");
    }
  },
};

module.exports = usersController;
