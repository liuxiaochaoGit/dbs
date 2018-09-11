const createError = require('http-errors');
const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const cors = require('cors');
const bodyParser = require('body-parser');
// const io = require('socket.io');
const JwtUtil = require('./public/utils/jwt');
const SocketUtil = require('./public/utils/socket');
const Conf = require('./public/conf');

// const URL = require('url');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var noteRouter = require('./routes/note');


var app = express();
// 跨域
app.use(cors());
// 解决请求体长度限制
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// token
app.set('jwtTokenSecret', 'QiWuGuiSaiPao');

// 定义每页显示数据条数
global.limit = 15;

// jade模板转为html模板
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'static')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//  socket test
var server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.write('Hello socket!');
    res.end();
}).listen(30002, '127.0.0.1');
const Socket = new SocketUtil(server);
Socket.connect();

// 验证token
app.use(function (req, res, next) {
    let isToken = Conf.prov.toString().indexOf(req.url);
    if (isToken != -1) {
        let token = req.headers.token;
        let jwt = new JwtUtil(token);
        let result = jwt.verifyToken();
        if (result == 'err') {
            console.log('=========token  Err========');
            console.warn('token过期');
            res.send({status: 403, msg: '登录已过期,请重新登录'});
            // res.render('login.html');
        } else {
            next();
        }
    } else {
        next();
    }
});

//
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, 'static')));


// router
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/note', noteRouter);

app.use('/static', express.static(path.join(__dirname, 'static')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log('=======err========');
    console.error(err);
    res.render('error');
});

module.exports = app;
