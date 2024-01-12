const User = require("../models/user.model");
const errorHendlerHelper = require("../helpers/errorHendlerHelper");
const responseHelper = require("../helpers/responseHelper");
const ErrorHelper = require("../helpers/errorHelper");
const sendEmail = require("../helpers/emailHelper");
const crypto = require("crypto");

// Register User
exports.registerUser = errorHendlerHelper(async (req, res, next) => {
  const { name, email, gender, password } = req.body;

  const user = await User.create({
    name,
    email,
    gender,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  responseHelper(user, 201, res);
});

// Login User
exports.loginUser = errorHendlerHelper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHelper("Please Enter Email And Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHelper("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHelper("Invalid Email or Password", 401));
  }

  responseHelper(user, 201, res);
});

// Logout User
exports.logoutUser = errorHendlerHelper(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Details
exports.getUserDetails = errorHendlerHelper(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Forgot Password
exports.forgotPassword = errorHendlerHelper(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHelper("User Not Found", 404));
  }

  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
  const resetPasswordUrl = `https://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  // const message = `Your password reset token is : \n\n ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email: user.email,
      templateId: process.env.SENDGRID_RESET_TEMPLATEID,
      data: {
        reset_url: resetPasswordUrl,
      },
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHelper(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = errorHendlerHelper(async (req, res, next) => {
  // create hash token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHelper("Invalid reset password token", 404));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  responseHelper(user, 200, res);
});

// Update Password
exports.updatePassword = errorHendlerHelper(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHelper("Old Password is Invalid", 400));
  }

  user.password = req.body.newPassword;
  await user.save();
  responseHelper(user, 201, res);
});

// Update User Profile
exports.updateProfile = errorHendlerHelper(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({
    success: true,
  });
});

// ADMIN DASHBOARD

// Get All Users --ADMIN
exports.getAllUsers = errorHendlerHelper(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single User Details --ADMIN
exports.getSingleUser = errorHendlerHelper(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHelper(`User doesn't exist with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Role --ADMIN
exports.updateUserRole = errorHendlerHelper(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deleteUser = errorHendlerHelper(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHelper(`User doesn't exist with id: ${req.params.id}`, 404)
    );
  }
  await user.remove();
  res.status(200).json({
    success: true,
  });
});
