var express = require('express');
var router = express.Router();

var articles = require('../models/article');


/* get index page */

router.get('/', function(req, res, next) {
  articles.find({},{})
    .exec(function (err, articles) {
      if (err) {
        return next(err);
        }
      articles.reverse();
      res.render('index', { title: 'Celina Plag', article_list: articles });
    });
});

module.exports = router;
