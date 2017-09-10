var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var articles = require('../models/article');


/* GET backend page. */
router.get('/', function(req, res, next) {
  articles.find({},{})
    .exec(function (err, articles) {
      if (err) {
        return next(err);
        }
      articles.reverse();
      res.render('backend', { title: 'Backend', article_list: articles });
    });
});

/* GET editor page. */
router.get('/editor', function(req, res, next) {
  res.render('editor');
});

/* POST NEW ARTICLE */
router.post('/newarticle', function(req, res, next){
  var article = {
    date: req.body.date,
    dateexact: req.body.dateexact,
    title: req.body.title,
    article: req.body.article
  };
  var data = new articles(article);
  data.save();
  res.redirect('/backend');
});

/* DELETE  ARTICLE */
router.get('/deletearticle/:id', function(req, res, next){
  var id = req.params.id;
  articles.findByIdAndRemove(id).exec();
  res.redirect('/backend');
});


/* UPDATE  ARTICLE */
router.get('/updatearticle/:id', function(req, res, next) {
  var id = req.params.id;
  articles.findById(id, function (err, article){
    if (err) {
      console.log('error');
    }
    res.render('editorupdate', { title: 'Editor', article_list: article });
  });
});

router.post('/updatearticle/:id', function(req, res, next){
  var id = req.params.id;
  articles.findById(id, function (err, article) {
    if (err) {
      console.log(err);
    }
    article.date = req.body.date;
    article.dateexact = req.body.dateexact;
    article.title = req.body.title;
    article.article = req.body.article;
    article.save();
    res.redirect('/backend');
  });
});


module.exports = router;
