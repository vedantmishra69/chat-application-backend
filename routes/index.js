var express = require('express');
const authRouter = require("./auth")
const dbRouter = require("./db")
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/auth", authRouter)
router.use("/db", dbRouter)
module.exports = router;
