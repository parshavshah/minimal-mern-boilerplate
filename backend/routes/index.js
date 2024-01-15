const express = require("express");
const router = express.Router();

const controllers = require("../controllers").controllers;
const validators = require("../validators").validators;

const authUser = require("../helpers/user.helper").authUser;

router.get("/", function (req, res, next) {
  res.send({ ok: ok });
});

// --- user
router.post("/user/login", controllers.userController.loginUser);

router.post("/user/verify", controllers.userController.verifyUser);

router.post(
  "/user/register",
  validators.userSignup,
  controllers.userController.registerUser
);

router.get(
  "/user/profile/:id",
  authUser,
  controllers.userController.getUserProfile
);
