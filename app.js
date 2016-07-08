/**
 * Created by zhubg on 2016/6/28.
 */

'use strict';

// process.env.NODE_ENV = 'production';

var nodeWeixinAuth = require('node-weixin-auth');
var favicon = require('serve-favicon');
var path = require('path');
//与微信对接服务器的验证
var errors = require('web-errors').errors;
var express = require('express');
var bodyParser = require('body-parser');
//session
var session = require("express-session");



var server = express();
var baseController = require('./controller/base_controller');


//开启gzip
var compression = require('compression');

// compress all requests
server.use(compression());

var sess = {
    secret: 'keyboard cat',
    cookie: {},
    saveUninitialized: true,
    resave: true
};

//使用Session
server.use(session(sess));
// app.use(express.session({
//     secret: 'a4f8071f-c873-4447-8ee2',
//     cookie: { maxAge: 2628000000 },
//     store: new (require('express-sessions'))({
//         storage: 'mongodb',
//         instance: mongoose, // optional
//         host: 'localhost', // optional
//         port: 27017, // optional
//         db: 'test', // optional
//         collection: 'sessions', // optional
//         expire: 86400 // optional
//     })
// }));

// Make sure to include the babel transpiler
require("babel-register");
// Include static assets. Not advised for production
server.use(express.static(path.join(__dirname, 'public')));
// Set view path
server.set('views', path.join(__dirname, 'views'));
// set up ejs for templating. You can use whatever
server.set('view engine', 'ejs');

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
//图标
server.use(favicon(__dirname + '/public/favicon.ico'));

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

//加载主路径
require('./app/routes/core_routes')(server);
require('./app/routes/support_routes')(server);
require('./app/routes/welcome_routes')(server);

server.all('/btw:performerid', function (req, res, next) {
    // res.redirect('https://github.com/miss61008596');
    //初始化params参数集为空
    let params = {};
    params.redirecturl = '/btw/performer';
    // 得到CODE
    var code = req.query.code;
    req.session.performerid = req.params.performerid;
    var state = req.query.state;
    console.log('code:' + code);
    console.log('state:' + state);
    if (code === undefined) {
        throw 'code不存在，请使用微信客户端登陆！';
    }
    console.log('look session：');
    console.dir(req.session);

    console.log('up: ' + req.session.code);

    if ((req.session.code === code && req.session.openid) || req.session.openid) {
        console.log('many time!');
        console.dir(req.session);
        //session中存在opendi直接跳转
        res.redirect(params.redirecturl);
    } else {
        console.log('first time!');
        params.code = code;
        baseController(req, res, 'user', 'getUserByCode', params)
            .then(obj => {
                //成功响应
                if (obj.length === 0) {
                    params.next = next;
                    baseController(req, res, 'user', 'checkSyncUserInfo', params);
                } else if (obj.length === 1) {
                    //将获取到的openid存入session
                    req.session.openid = obj[0].openid;
                    console.log('look session：');
                    console.dir(req.session);
                    res.redirect(params.redirecturl);
                } else {
                    //不可能
                    res.send('Ghost is coming!')
                }
            })
            //失败退出
            .catch(params.next);
    }
});

server.all('/test99:testid', function (req, res, next) {
    // // 获取session.openid
    // var openid = req.session.openid;
    // //清除session.openid
    // delete req.session.openid;
    // console.log('openid:' + openid);
    // console.dir(req.session);
    let testid = req.params.testid;
    console.log(testid);
    res.send(testid);
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
var listener = server.listen(3000, function () {
    let host = listener.address().address;
    let port = listener.address().port;
    console.log('hello,http://' + host + ':' + port);
});