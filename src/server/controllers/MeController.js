const Products = require("../models/Products.js");
const Users = require("../models/Users.js");
const Pets = require("../models/Pets.js");
const ServicePack = require("../models/ServicePack");
const Appointments = require("../models/Appointment.js");

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
      let usersQuery = Users.find({});

      const countDelete = await Users.countDocumentsWithDeleted({
        deleted: true,
      });
      const users = await usersQuery;
      await res.send({
        countDelete,
        users: multipleMongooseToObject(users),
      });
    } catch (err) {
      res.status(500).send("Không render được người dùng!");
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
      res.status(500).send("Không render được service pack!");
    }
  },

  // [GET] "api/stored/pets"
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
      res.status(500).send("Không render được pet!");
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
      res.status(500).send("Không render được pet!");
    }
  },
};

module.exports = meController;
