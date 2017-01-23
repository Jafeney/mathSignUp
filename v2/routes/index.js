var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
    res.render('admin', {})
});

/* GET school page. */
router.get('/signup', function(req, res, next) {
    res.render('signup', {})
});

module.exports = router;
