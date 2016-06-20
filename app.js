'use strict';

var nodeWeixinAuth = require('node-weixin-auth');
var baseController = require('./controller/base_controller');
var path = require('path');
//与微信对接服务器的验证
var errors = require('web-errors').errors;
var express = require('express');
var bodyParser = require('body-parser');
var server = express();
var params = {};

// Make sure to include the JSX transpiler
require('node-jsx').install();

// Include static assets. Not advised for production
server.use(express.static(path.join(__dirname, 'public')));
// Set view path
server.set('views', path.join(__dirname, 'views'));
// set up ejs for templating. You can use whatever
server.set('view engine', 'ejs');

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());


// 微信服务器返回的ack信息是HTTP的GET方法实现的
server.get('/ack', function (req, res, next) {
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

server.get('/', function (req, res, next) {
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


require('./app/routes/core-routes.js')(server);

server.all('/test', function (req, res, next) {
    // res.redirect('https://github.com/miss61008596');
    //得到CODE
    var code = req.query.code;
    var state = req.query.state;
    console.log('code:' + code);
    console.log('state:' + state);
    if (code === undefined) {
        throw 'code不存在，请使用微信客户端登陆！';
    }

    res.render('index', {
        react: ReactDOM.renderToString(HelloMessage({name: "John"}))
    });
    // baseController(req, res, 'user', 'checkSyncUserInfo',params);        

    // params.next = next;
    //
    // baseController(req, res, 'user', 'checkSyncUserInfo', params);
    // baseController(req, res, 'user', 'getUserByOpenid',params)
    //     .then(obj => {
    //         //成功响应
    //         res.json(obj);
    //         console.log(obj)
    //     })
    //     //失败退出
    //     .catch(next);
});

//处理错误
server.use((err, req, res, next) => {
    let data = {};
    // data.url = req.originalUrl;
    data.error = err.stack ? err.stack : JSON.stringify(err);
    console.log(
        'express处理错误');
    res.status(500).json(
        data
    );
});

//server启动80
var listener = server.listen(80, function () {
    let host = listener.address().address;
    let port = listener.address().port;
    console.log('hello,http://' + host + ':' + port);
});