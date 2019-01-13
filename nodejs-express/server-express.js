const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const multer = require('multer');
const consolidate = require('consolidate');

var server = express();
server.listen(8080);

//1. 解析cookie
server.use(cookieParser('hfahfhjashfjsah'));
//2. 使用session
var arr = [];
for (var i = 0; i < 100000; i++) {
    arr.push('keys_' + Math.random());
}
server.use(cookieSession({
    name: 'zns_sess_id',
    keys: arr,
    maxAge: 20 * 60 * 1000
}));

//3. Post数据
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(multer({
    dest: './www/upload/'
}).any());

//用户请求
server.use('/', function (req, res, next) {
    console.log(req.query, req.body, req.files, req.cookies, req.session);
    next();
});

//4. 配置魔板引擎
// 输出什么东西
server.set('view engine', 'html');
// 模板文件放在那里
server.set('views', './views');
// 使用哪种模板
server.engine('html', consolidate.ejs);

server.get('/index', function (req, res, next) {
    res.render('1.ejs', {
        name: 'blue'
    });
});


//5. 静态数据
server.use(static('./www/'))