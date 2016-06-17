'use strict';

var nodeWeixinAuth = require('node-weixin-auth');
var app = {
    id: 'wx7ca9c509abe55d26',
    secret: '05dfc2c82ccd8a6ef5f3713762632402',
    token: 'zhubg'
};

var nodegrass = require('nodegrass');

//与微信对接服务器的验证
var errors = require('web-errors').errors;
var express = require('express');
var bodyParser = require('body-parser');

var server = express();

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

// 微信服务器返回的ack信息是HTTP的GET方法实现的
server.get('/ack', function (req, res) {
    var data = nodeWeixinAuth.extract(req.query);
    nodeWeixinAuth.ack(app.token, data, function (error, data) {
        if (!error) {
            res.send(data);
            console.log('connetct done!:' + data);
            return;
        }
        switch (error) {
            case 1:
                res.send(errors.INPUT_INVALID);
                console.log(errors.INPUT_INVALID);
                break;
            case 2:
                res.send(errors.SIGNATURE_NOT_MATCH);
                console.log(errors.SIGNATURE_NOT_MATCH);
                break;
            default:
                res.send(errors.UNKNOWN_ERROR);
                console.log(errors.UNKNOWN_ERROR);
                break;
        }
    });
});

server.get('/', function (req, res) {
    // res.redirect('https://github.com/miss61008596');
    res.send(`<html>
<body>
<div style="display: flex;flex-direction: row;justify-content: center;align-items: center">
<div style="display: flex">
<img style="width: 160px;height: 160px;border-radius: 80px;margin-right: 20px" src="http://120.27.124.108:10255/222.jpg" />
</div>
<div style="display: flex;flex-direction: column;">
<h1>个人技术分享</h1>
<h1>请访问我的github主页</h1><a href="https://github.com/miss61008596">https://github.com/miss61008596</a>
<h5>QQ:61008596</h5>
</div>
</div>
</body>
</html>`);
});

server.get('/test', function (req, res) {
    // res.redirect('https://github.com/miss61008596');
    var times =0;
    var code = req.query.code;
    var state = req.query.state;
    console.log('times:'+times);
    console.log('code:'+code);
    console.log('state:'+state);
    if (code){
        nodegrass.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=`+app.id+`&secret=`+app.secret+`&code=`+code+`&grant_type=authorization_code`,
            function (data, status, headers) {
                console.log(status);
                console.log(headers);
                console.log(data);
            }, null, 'utf8').on('error', function (e) {
            console.log("Got error: " + e.message);
        });
    } else {
       console.log('res:no code '+code);
    }
    times++;

});


var listener = server.listen(80, function () {
    let host = listener.address().address;
    let port = listener.address().port;
    console.log('hello,http://' + host + ':' + port);
});