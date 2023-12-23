const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authController = {
  // [GET] "api/auth/signUp"
  signUp: async (req, res) => {
    try {
      await res.send("Trang đăng ký");
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  // [GET] "api/auth/login"
  login: async (req, res) => {
    try {
      await res.send("Trang đăng nhập");
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "100d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "365d" }
    );
  },

  // [POST] "api/auth/loginUser"
  loginUser: async (req, res) => {
    try {
      const user = await Users.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json("Wrong email");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(401).json("Wrong password");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...other } = user._doc;
        res.status(200).json({ ...other, accessToken });
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  // [GET] api/auth/requestRefreshToken
  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  // [GET] "api/auth/logoutUser"
  logoutUser: async (req, res) => {
    try {
      res.clearCookie("refreshToken");
      refreshTokens = refreshTokens.filter(
        (token) => token !== req.cookies.refreshToken
      );
      res.status(200).json("Logout");
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};

module.exports = authController;
