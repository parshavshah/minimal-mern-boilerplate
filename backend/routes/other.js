const express = require("express");
const router = express.Router();

const controllers = require("../controllers").controllers;


// --- user
router.get("/other/one", controllers.userController.loginUser);
router.get("/other/two", controllers.userController.loginUser);
router.get("/other/three", controllers.userController.loginUser);


module.exports = router;
