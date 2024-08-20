var express = require('express');
const authRouter = require("./auth")
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/auth", authRouter)

module.exports = router;
