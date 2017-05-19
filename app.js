var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var app = express();

var hbs = exphbs.create({
     

    extname: '.html',
    helpers: {
      

     
        tambahSatu: function (angka) {
            return angka + 2
        },
        tambahSatuAdmin: function (angka) {
            return angka + 1
        }


    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', hbs.engine);
app.set('view engine', '.html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/tinymce', express.static(__dirname + '/node_modules/tinymce/'));
app.use('/material', express.static(__dirname + '/node_modules/bootstrap-material-design/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/handlebars', express.static(__dirname + '/node_modules/handlebars/dist/'));
app.use('/font-material', express.static(__dirname + '/node_modules/material-design-icons/iconfont/'));
app.use('/font-awesome', express.static(__dirname + '/node_modules/font-awesome/'));
app.use('/codemirror', express.static(__dirname + '/node_modules/codemirror/'));
app.use('/quill', express.static(__dirname + '/node_modules/quill/dist/'));

app.use(session({
    secret: 'somesecrettokenhere',
    resave: false,
    saveUninitialized: true
}));


app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});



var pengamananUser = function (req, res, next) {

    console.log(session.namaSession);


    if (!req.session.namaAdmin && req.session.namaSession !== undefined)
        return next();

    res.send("Engga dijinin gan!");
};


var pengamananAdmin = function (req, res, next) {

    if (req.session.admin === true)
        return next();

    res.send("Engga dijinin gan!");
};

app.get('/', users.login);
app.post('/login', users.autentifikasi);
app.get('/profile', pengamananUser, users.profile);

//untuk admin
app.get('/login-admin' , admin.login);
app.post('/loginAdmin', admin.autentifikasi);
app.get('/dashboard', pengamananAdmin, admin.dashboard);
app.get('/soal-java', pengamananAdmin, admin.soalJava);
app.get('/add-soal', pengamananAdmin, admin.addSoal);
app.post('/add-soal', admin.addSoalEditor);
app.get('/keluar-admin', pengamananAdmin, admin.keluar);
app.get('/keluar-users', pengamananAdmin, users.keluar);
app.get('/admin/dashboard/user-detail/:id',pengamananAdmin, admin.userDetail);
app.post('/compile', pengamananUser, users.compile);
app.post('/update', pengamananAdmin, admin.updateUser);
app.get('/video-java', admin.videoJava);
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
