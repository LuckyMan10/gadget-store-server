const User = require("../models/userModel");
const FavoriteList = require("../models/favoriteListModel");
const Cart = require("../models/cartModel");
const jwt = require("jsonwebtoken");
const tokenService = require("../service/tokenService");

class userController {
  async getUserCart(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = tokenService.validateAccessToken(token);
      const userCart = await Cart.find({ userId: decoded.id });
      res.status(200).json(userCart);
    } catch (e) {
      console.log("getUserCart error: ", e);
      res.status(400).json({ message: e });
    }
  }
  async updateUserCart(req, res) {
    try {
      const quantity_values = {
        DECREMENT: "DECREMENT",
        INCREMENT: "INCREMENT",
      };
      function isChangeQuantity(type, value, quantity_values) {
        if (type === quantity_values.DECREMENT && value > 1) {
          return -1;
        }
        if (type === quantity_values.DECREMENT && !(value > 1)) {
          return 0;
        }
        if (type === quantity_values.INCREMENT) {
          return 1;
        }
      }
      const token = req.headers.authorization.split(" ")[1];
      const decoded = tokenService.validateAccessToken(token);
      const { updateItem, type } = req.body;
      const cart = await Cart.find({ userId: decoded.id });
      console.log("cart: ", cart);
      const newItem = cart[0].products.filter(
        (el) => el.productId === updateItem.productId
      );
      if (!newItem[0]) {
        const update = await Cart.findOneAndUpdate(
          { userId: decoded.id },
          {
            $push: {
              products: updateItem,
            },
          }
        );
        res.status(200).json(update);
      }
      if (newItem[0]) {
        if(!type) {
          throw "Необходимо указать type (INCREMENT или DECREMENT)";
        }
        if(!quantity_values[type]) {
          throw "Неизвестный type. Допустимые значения INCREMENT или DECREMENT.";
        }
        const update = await Cart.findOneAndUpdate(
          { userId: decoded.id, "products.productId": updateItem.productId },
          {
            $inc: {
              "products.$.quantity": isChangeQuantity(type, newItem[0].quantity, quantity_values)
            },
          }
        );
        res.status(200).json(update);
      }
    } catch (e) {
      console.log("updateUserCart error: ", e);
      res.status(400).json({ message: e });
    }
  }
  async deleteUserCart(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = tokenService.validateAccessToken(token);
      const { id } = req.query;
      if (!id) {
        res
          .status(400)
          .json({ message: "Недостаточно информации для удаления." });
      }
      const cart = await Cart.find({ userId: decoded.id });
      const cartItem = cart[0].products.filter((el) => el.productId === id);
      const remove = await Cart.findOneAndUpdate(
        { userId: decoded.id },
        {
          $pull: {
            "products": {"productId": id}
          },
        }
      );
      res.status(200).json(remove);
    } catch (e) {
      console.log("deleteUserCart: ", e);
      res.status(400).json({ message: e });
    }
  }

  async getFavList(req, res) {
    try {
    } catch (e) {
      console.log("getFavList error: ", e);
      throw e;
    }
  }
  async updateFavList(req, res) {
    try {
    } catch (e) {
      console.log("createFavList error: ", e);
      throw e;
    }
  }
}

module.exports = new userController();
