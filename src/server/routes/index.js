const productRouter = require("./products");
const siteRouter = require("./site");
const meRouter = require("./me");
const authRouter = require("./auth");
const usersRouter = require("./users");
const petsRouter = require("./pets");
const serviceRouter = require("./servicePack");
const appointmentsRouter = require("./appointments");

const route = (app) => {
  app.use("/api/products", productRouter);
  app.use("/api/me", meRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/pets", petsRouter);
  app.use("/api/service-pack", serviceRouter);
  app.use("/api/appointment", appointmentsRouter);
  app.use("/api/", siteRouter);
};

module.exports = route;
