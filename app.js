var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var multer  = require('multer');

 // production modules
var compression = require('compression');
var helmet = require('helmet');


var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI || 'mongodb://celina:celinaplag@ds145009.mlab.com:45009/celina';
// var mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/celina';


mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Storage option can be changed - check Multer docs
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // var path = './images'; // Make sure this path exists
        // cb(null, path);
        cb(null, path.join('./public/images'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});

var index = require('./routes/index');
var backend = require('./routes/backend');

var app = express();

app.use(helmet());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(compression()); //Compress all routes

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/backend', backend);



// Will handle POST requests to /upload
app.post('/backend/upload', upload.single('file'), function(req, res) {
    var imageLink = '/images/' + req.file.filename;
    // console.log(imageLink);
    res.json({location: imageLink}).end();

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
