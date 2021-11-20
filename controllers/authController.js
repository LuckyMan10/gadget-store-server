const User = require("../models/userModel");
const userService = require("../service/userService");

class authController {
  async login(req, res) {
    try {
      res.status(200).json({message: 'Good!'})
    } catch (e) {
      console.log("login error: ", e);
    }
  }
  async registration(req, res) {
    try {
      const {username, password, email} = req.body;
      const userData = await userService.registrationProcess({
        email,
        password,
        username
      });

    } catch (e) {
      console.log("registration error: ", e);
    }
  }
  async logout(req, res) {
    try {
    } catch (e) {
      console.log("logout error: ", e);
    }
  }
  async refresh(req, res) {
    try {
    } catch (e) {
      console.log("refresh error: ", e);
    }
  }
}

module.exports = new authController();
