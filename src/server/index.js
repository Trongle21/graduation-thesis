const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/db");
const cors = require("cors");
const router = require("./routes");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

// Connect db
db.connectData();

// Phân tích các yêu cầu chứa dữ liệu dạng JSON.
app.use(express.json());

// css
app.use(express.static(path.join(__dirname, "public")));

// Sử dụng method override(dùng put, patch, delete)
app.use(methodOverride("_method"));

// Sử dụng cors
app.use(cors());

// Sử dụng cookie-parser
app.use(cookieParser());

// Sử dụng dotenv
dotenv.config();

// Sử dụng router
router(app);

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(8000, () => console.log("server start"));
