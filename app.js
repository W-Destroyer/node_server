var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var reqMiddleware = require('./utils/reqmiddleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'upload')));


app.use(reqMiddleware());

app.use('/', routes);
app.use('/sysconfig', require('./routes/sysconfig'));
app.use('/product', require('./routes/product'));
app.use('/commodity', require('./routes/commodity'));
app.use('/classify', require('./routes/classify'));
app.use('/news', require('./routes/news'));
app.use('/upload', require('./routes/upload'));
app.use('/user', require('./routes/user'));
app.use('*', require('./routes/error'));

module.exports = app;