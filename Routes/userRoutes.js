const express = require("express");
const routes = express.Router();
const userController = require("../Controller/userController");
const userControllerpract = require("../Controller/userController_pract");
const authMiddleWare = require("../middlewares/auth_pract");
const upload = require("../middlewares/multer");
routes.post("/v1/books/signup", upload.single("file"), userControllerpract.Up);
routes.post("/v1/books/signin", userControllerpract.In);
routes.put(
  "/v1/books/signin/updateprofile",
  authMiddleWare,
  upload.single("file"),
  userControllerpract.updateProfile
);

module.exports = routes;
