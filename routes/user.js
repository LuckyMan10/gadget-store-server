const Router = require("express");
const userController = require("../controllers/userController");
const router = new Router();

router.get("/cart", userController.getUserCart);
router.post("/cart", userController.createUserCart);
router.put("/cart", userController.updateUserCart);

router.get("/favoriteList", userController.getFavList);
router.post("/favoriteList", userController.createFavList);
router.put("/favoriteList", userController.updateFavList);

module.exports = router;