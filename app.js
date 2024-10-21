const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const { mainModule } = require("process");
const multer = require("multer");
const upload = multer();
require("dotenv").config();

const mongodb_uri = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
connectDB().catch((err) => console.log(err));
async function connectDB() {
  await mongoose.connect(mongodb_uri);
}

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
const helmet = require("helmet");
const app = express();
app.use(limiter);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(upload.none());
app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
