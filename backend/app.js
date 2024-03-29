const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const userRouter = require("./routes/user");
const otherRouter = require("./routes/other");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// mongo connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,useUnifiedTopology: true 
});
mongoose.connection.on("error", (error) => {
  console.log("Connection error");
  console.log(error);
});

// check application health
app.use("/health", function (req, res, next) {
  res.send({ health: "ok" });
});

// application routes
app.use("/api/v1", userRouter);
app.use("/api/v1", otherRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
