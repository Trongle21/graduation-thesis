const Products = require("../models/Products.js");
const Users = require("../models/Users.js");
const Pets = require("../models/Pets.js");
const ServicePack = require("../models/ServicePack");
const Appointments = require("../models/Appointment.js");
const Order = require("../models/Order.js");
const Contact = require("../models/Contact.js");

const { multipleMongooseToObject } = require("../until/mongoose");

const meController = {
  // [GET] "api/stored/products"
  storedProducts: async (req, res) => {
    try {
      let productsQuery = Products.find({});
      const countDelete = await Products.countDocumentsWithDeleted({
        deleted: true,
      });
      const products = await productsQuery;
      await res.send({
        countDelete,
        products: multipleMongooseToObject(products),
      });
    } catch (err) {
      res.status(500).send("Không render được sản phẩm!");
    }
  },

  // [GET] "api/trash/products"
  trashProducts: async (req, res) => {
    try {
      const products = await Products.findDeleted({});
      await res.send({
        products: multipleMongooseToObject(products),
      });
    } catch (err) {
      res.status(500).send("Không render được các sản phẩm đã xóa!");
    }
  },

  // [GET] "api/stored/users"
  storedUsers: async (req, res) => {
    try {
      let UsersQuery = Users.find({});
      const countDelete = await Users.countDocumentsWithDeleted({
        deleted: true,
      });
      const users = await UsersQuery;
      await res.send({
        countDelete,
        users: multipleMongooseToObject(users),
      });
    } catch (err) {
      res.status(500).send("Không render được sản phẩm!");
    }
  },

  // [GET] "api/trash/users"
  trashUsers: async (req, res) => {
    try {
      const users = await Users.findDeleted({});
      await res.send({
        users: multipleMongooseToObject(users),
      });
    } catch (err) {
      res.status(500).send("Không render được những người dùng đã xóa!");
    }
  },

  // [GET] "api/stored/pets"
  storedPets: async (req, res) => {
    try {
      let usersQuery = Pets.find({});

      const countDelete = await Pets.countDocumentsWithDeleted({
        deleted: true,
      });

      const pets = await usersQuery;
      await res.send({
        countDelete,
        pets: multipleMongooseToObject(pets),
      });
    } catch (err) {
      res.status(500).send("Không render được pet!");
    }
  },

  // [GET] "api/trash/pets"
  trashPets: async (req, res) => {
    try {
      const pets = await Pets.findDeleted({});
      await res.send({
        pets: multipleMongooseToObject(pets),
      });
    } catch (err) {
      res.status(500).send("Không render được những pet đã xóa!");
    }
  },

  // [GET] "api/stored/service-pack"
  storedServicePack: async (req, res) => {
    try {
      let usersQuery = ServicePack.find({});

      const countDelete = await ServicePack.countDocumentsWithDeleted({
        deleted: true,
      });

      const servicePack = await usersQuery;
      await res.send({
        countDelete,
        servicePack: multipleMongooseToObject(servicePack),
      });
    } catch (err) {
      res.status(500).send("Không render được dịch vụ!");
    }
  },

  // [GET] "api/trash/service-pack"
  trashServicePack: async (req, res) => {
    try {
      const servicePack = await ServicePack.findDeleted({});
      await res.send({
        servicePack: multipleMongooseToObject(servicePack),
      });
    } catch (err) {
      res.status(500).send("Không render được các dịch vụ đã xóa!");
    }
  },

  // [GET] "api/stored/appointments"
  storedAppointments: async (req, res) => {
    try {
      let usersQuery = Appointments.find({});

      const countDelete = await Appointments.countDocumentsWithDeleted({
        deleted: true,
      });

      const appointments = await usersQuery;
      await res.send({
        countDelete,
        appointments: multipleMongooseToObject(appointments),
      });
    } catch (err) {
      res.status(500).send("Không render được lịch hẹn!");
    }
  },

  // [GET] "api/trash/appointment"
  trashAppointment: async (req, res) => {
    try {
      const appointment = await Appointments.findDeleted({});
      await res.send({
        appointment: multipleMongooseToObject(appointment),
      });
    } catch (err) {
      res.status(500).send("Không render được những lịch hẹn đã xóa!");
    }
  },

  // [GET] "api/stored/order"
  storedOrder: async (req, res) => {
    try {
      let orderQuery = Order.find({});
      const countDelete = await Order.countDocumentsWithDeleted({
        deleted: true,
      });
      const order = await orderQuery;

      await res.send({
        countDelete,
        order: multipleMongooseToObject(order),
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // [GET] "api/trash/order"
  trashOrder: async (req, res) => {
    try {
      const order = await Order.findDeleted({});
      await res.send({
        order: multipleMongooseToObject(order),
      });
    } catch (err) {
      res.status(500).send("Không render được những đơn hàng đã xóa!");
    }
  },

  // [GET] "api/stored/contact"
  storedContact: async (req, res) => {
    try {
      let contactQuery = Contact.find({});
      const countDelete = await Contact.countDocumentsWithDeleted({
        deleted: true,
      });
      const contact = await contactQuery;

      await res.send({
        countDelete,
        contact: multipleMongooseToObject(contact),
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // [GET] "api/trash/contact"
  trashContact: async (req, res) => {
    try {
      const contact = await Contact.findDeleted({});
      await res.send({
        contact: multipleMongooseToObject(contact),
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = meController;
