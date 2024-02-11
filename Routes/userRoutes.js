const express = require("express");
const routes = express.Router();
const userController = require("../Controller/userController");
const userControllerpract = require("../Controller/userController_pract");

routes.post("/v1/books/signup", userControllerpract.Up);
routes.post("/v1/books/signin", userControllerpract.In);

module.exports = routes;
