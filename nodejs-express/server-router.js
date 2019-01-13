const express = require('express')
const routerArticle = require('./routers/article')

var server = express()
server.listen(8080)

// 目录:/user/
var routerUser = express.Router()
routerUser.get('/1.html', function (req, res) {
    res.send('1.html ok')
})

routerUser.get('/2.html', function (req, res) {
    res.send('2.html ok')
})

server.use('/user', routerUser)


//目录:/article/
server.use('/article', routerArticle)