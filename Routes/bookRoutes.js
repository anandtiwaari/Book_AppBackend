const express = require("express");
const bookController = require("../Controller/bookController");
const favouriteController = require("../Controller/favourtieBookController");
// const authMiddleware = require("../middlewares/auth");
// const authMiddlewares = require("../middlewares/auth_pract");
const authpract = require("../middlewares/auth_pract");
const cartController = require("../Controller/cartController");
const routes = express.Router();
const upload = require("../middlewares/multer");

routes.get("/v1/books/getAllBooks", authpract, bookController.getAllBooks);
routes.get(
  "/v1/books/getSingleBooks/:id",
  authpract,
  bookController.getSingleBooks
);
routes.post(
  "/v1/books/createBooks",
  authpract,
  upload.single("file"),
  bookController.AddBooks
);
routes.delete("/v1/books/deleteBook/:id", authpract, bookController.deleteBook);
routes.put(
  "/v1/books/updateBook/:id",
  authpract,
  upload.single("file"),
  bookController.updateBooks
);
// favourite routes
routes.post(
  "/v1/books/markFavourite/:id",
  authpract,
  favouriteController.markFavourite
);
routes.post(
  "/v1/books/markUnFavourite/:id",
  authpract,
  favouriteController.markUnFavourite
);
routes.get(
  "/v1/books/favourites",
  authpract,
  favouriteController.getAllFavouritesBook
);

//cart routes

routes.post("/v1/books/cart/add", authpract, cartController.cartController);
routes.get("/v1/books/cart/cartData", authpract, cartController.getAllCartData);
module.exports = routes;
