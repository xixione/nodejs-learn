const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs')
const pathLib = require('path')

var server = express();
server.listen(8080);

// Post数据
server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(multer({
    dest: './www/upload/'
}).any());

//用户请求
server.use('/', function (req, res) {
    // console.log(req.body, req.files);
    //1. 获取原始的文件后缀
    // console.log(req.files[0].originalname)
    if (req.files != null && req.files.length > 0) {
        var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;
        //2. 对临时文件重命名
        fs.rename(req.files[0].path, newName, function (err) {
            if (err) {
                res.send('上传失败');
            } else {
                res.send('上传成功');
            }
        });
    } else {
        res.send("结束");
    }
});