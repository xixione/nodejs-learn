const express = require('express')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

var server = express()
server.listen(8080)

// 读取cookie
server.use(cookieParser())

var arr = [];
for (var i = 0; i < 100000; i++) {
    arr.push('keys_' + Math.random());
}
server.use(cookieSession({
    name: 'zns_sess_id',
    keys: arr,
    maxAge: 20 * 60 * 1000
}));


// server.get('/', function (req, res, next) {
//     console.log(req.cookies)
//     res.cookie('name', 'blue', {
//         path: '/',
//         maxAge: 24 * 3600 * 1000
//     })
//     res.send('ok')
// })

server.get('/', function (req, res) {
    if (req.session['count'] == null) {
        req.session['count'] = 1;
    } else {
        req.session['count']++;
    }
    console.log(req.session['count'])
    res.send('ok');
})