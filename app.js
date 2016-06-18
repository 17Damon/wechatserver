'use strict';

var nodeWeixinAuth = require('node-weixin-auth');
var app = {
    id: 'wx7ca9c509abe55d26',
    secret: '05dfc2c82ccd8a6ef5f3713762632402',
    token: 'zhubg'
};

var getAccessToken = require('./until_api/get_user_info/get_user_info');

//与微信对接服务器的验证
var errors = require('web-errors').errors;
var express = require('express');
var bodyParser = require('body-parser');

var server = express();

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

server.get('/test', function (req, res, next) {
    // res.redirect('https://github.com/miss61008596');
    var times = 1;
    //得到CODE
    var code = req.query.code;
    var state = req.query.state;
    var effect_flag = false;
    var access_token;
    var refresh_token;
    var openid;
    console.log('times:' + times);
    console.log('code:' + code);
    console.log('state:' + state);
    if (code === undefined) {
        throw 'code不存在，请使用微信客户端登陆！';
    }

    // //通过code换取网页授权
    // var getAccessToken = function (id, secret, code) {
    //     let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=` + id + `&secret=` + secret + `&code=` + code + `&grant_type=authorization_code`;
    //     // let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=` + app.id + `&secret=` + app.secret + `&code=` + code + `&grant_type=authorization_code`;
    //     return new Promise(function (resolve, reject) {
    //         request({url: url, json: true}, function (error, response, body) {
    //             if (error) return reject(error);
    //             console.log('1.通过code换取网页授权access_token');
    //             console.log(body);
    //             access_token = body.access_token;
    //             refresh_token = body.refresh_token;
    //             openid = body.openid;
    //             resolve();
    //         });
    //     });
    // };
    //
    // //检验授权凭证（access_token）是否有效
    // var checkAccessToken = function (access_token, openid) {
    //     let url = `https://api.weixin.qq.com/sns/auth?access_token=` + access_token + `&openid=` + openid;
    //     return new Promise(function (resolve, reject) {
    //         request({url: url, json: true}, function (error, response, body) {
    //             if (error) return reject(error);
    //             console.log('2.检验授权凭证（access_token）是否有效');
    //             console.log(body);
    //             if (body.errcode === 0) {
    //                 effect_flag = true;
    //             }
    //             resolve();
    //         });
    //     });
    // };
    //
    // //刷新access_token
    // var refreshAccessToken = function (refresh_token, id) {
    //     let url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=` + id + `&grant_type=refresh_token&refresh_token=` + refresh_token;
    //     return new Promise(function (resolve, reject) {
    //         request({url: url, json: true}, function (error, response, body) {
    //             if (error) return reject(error);
    //             console.log('3.刷新access_token');
    //             console.log(body);
    //             access_token = body.access_token;
    //             refresh_token = body.refresh_token;
    //             resolve();
    //         });
    //     });
    // };
    //
    // //拉取用户信息(需scope为 snsapi_userinfo)
    // var getUserinfo = function (access_token, openid) {
    //     let url = `https://api.weixin.qq.com/sns/userinfo?access_token=` + access_token + `&openid=` + openid + `&lang=zh_CN`;
    //     return new Promise(function (resolve, reject) {
    //         request({url: url, json: true}, function (error, response, body) {
    //             if (error) return reject(error);
    //             console.log('4.拉取用户信息');
    //             console.log(body);
    //             resolve();
    //         });
    //     });
    // };

    res.send(getAccessToken(app.id,app.secret,code));
    next();
});


//处理错误
server.use((err, req, res, next) => {
    let data = {};
    // data.url = req.originalUrl;
    data.error = err.stack ? err.stack : JSON.stringify(err);
    res.status(500).json(
        data
    );
});

var listener = server.listen(80, function () {
    let host = listener.address().address;
    let port = listener.address().port;
    console.log('hello,http://' + host + ':' + port);
});