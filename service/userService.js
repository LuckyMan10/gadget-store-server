const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const FavList = require("../models/favoriteListModel");
const bcrypt = require("bcrypt");

class userService {
  async registrationProcess({ email, username, password }) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw "Пользователь с такой почтой уже существует.";
    }
    const hashPassword = await bcrypt.hash(password, 2);
    const user = await User.create({
      email,
      username,
      password: hashPassword,
    });
    if (user && user._id) {
      const cart = await Cart.create({
        userId: user._id,
      });
      const favList = await FavList.create({
        userId: user._id,
      });
    };
    if(!(user && user._id)) {
        throw "Произошла ошибка при регистрации. Повторите попытку позже."
    }
  }
}

module.exports = new userService();
