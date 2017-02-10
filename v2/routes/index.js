var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: '中国大学生医药数学建模报名系统'});
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
