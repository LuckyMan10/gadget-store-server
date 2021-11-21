const Router = require("express");
const userController = require("../controllers/userController");
const checkAuth = require("../middleware/checkAuthMiddlewares");
const router = new Router();


router.get("/cart", checkAuth, userController.getUserCart);
router.put("/cart", checkAuth, userController.updateUserCart); // IF THE ITEM IN THE BASKET REQUIRED INCREMENT OR DECREMENT TYPE
router.delete("/cart", checkAuth, userController.deleteUserCart);

router.get("/favoriteList", checkAuth, userController.getFavList);
router.put("/favoriteList", checkAuth, userController.updateFavList);
router.delete("/favoriteList", checkAuth, userController.deleteFavList)

module.exports = router;
