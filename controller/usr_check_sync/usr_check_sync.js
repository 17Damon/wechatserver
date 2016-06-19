/**
 * Created by zhubg on 2016/6/18.
 */

'use strict';

//baseServirce注册
var baseServirce = require('../../service/base_service');
var baseController = require('../../controller/base_controller');

var nodegrass = require('nodegrass');
var app = require('../../util/app_setting');
var access_token;
var refresh_token;
var openid;
var appid = app.id;
var appsecret = app.secret;
var effect_flag = false;

//通过code换取网页授权
function getAccessToken(req, res, module, method, params) {
    var resCustom = function (obj) {
        res.send(obj);
    };
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=` + appid + `&secret=` + appsecret + `&code=` + req.query.code + `&grant_type=authorization_code`;
    // nodegrass.get(url, function (data, status, headers) {
    //     console.log('1.通过code换取网页授权access_token');
    //     console.log(status);
    //     console.log(headers);
    //     console.log(data);
    //     let data_json = JSON.parse(data);
    //     if (data_json.access_token && data_json.openid) {
    //         access_token = data_json.access_token;
    //         refresh_token = data_json.refresh_token;
    //         openid = data_json.openid;
    params.openid = 'o7CarwEfoKMx_tWSo54kKFPtkgYA';
    baseServirce(req, res, 'user', 'getUserByOpenid', params)
        .then(obj => {
            //成功响应
            if (obj.length === 0) {
                throw 'no user found!';
            } else {
                console.log(obj);
                res.json(obj);
                // return Promise.reject(
                //     'Permission can not [' + module + ']&&' + '[' + method + ']'
                // )
            }
        })
        //失败退出
        .catch(params.next);
    // return checkAccessToken('vwRBLoAqhxjwZCsqYlwab2CJWPoZa59EpYLoDUxAYeYOWwH93R_s397XlYUJNYew-BZ4GLjA3P7ksvunlkQbz8wqMzhl6Fu_5AVcT9LgNY4', 'o7CarwEfoKMx_tWSo54kKFPtkgYA', req, res, params);
    //     } else {
    //         console.log('获取access_token失败');
    //         return resCustom('获取access_token失败');
    //     }
    // }, null, 'utf8').on('error', function (e) {
    //     console.log("Got error: " + e.message);
    // });
}

//检验授权凭证（access_token）是否有效
function checkAccessToken(access_token, openid, req, res, params) {
    let url = `https://api.weixin.qq.com/sns/auth?access_token=` + access_token + `&openid=` + openid;
    nodegrass.get(url, function (data, status, headers) {
        console.log('2.检验授权凭证（access_token）是否有效');
        console.log(status);
        console.log(headers);
        console.log(data);
        let data_json = JSON.parse(data);
        if (data_json.errcode === 0) {
            effect_flag = true;
            console.log('access_token有效');
            return getUserinfo(access_token, openid, req, res, params);
        } else if (data_json.errcode === 42001) {
            console.log('access_token超时');
            return refreshAccessToken('vwRBLoAqhxjwZCsqYlwab1VMFcj9SKO-w7DGsFI5xaNgTvbWdxkr_7kcvOipgat6m8iojTYli9NolR4eFmi9TJBW6VksaE1Jys4Rmps5UQ8', req, res, params);
        } else {
            console.log('access_token和openid不匹配');
        }
    }, null, 'utf8').on('error', function (e) {
        console.log("Got error: " + e.message);
    });

}

//刷新access_token
function refreshAccessToken(refresh_token, req, res, params) {
    let url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=` + appid + `&grant_type=refresh_token&refresh_token=` + refresh_token;
    nodegrass.get(url, function (data, status, headers) {
        console.log('3.刷新access_token');
        console.log(status);
        console.log(headers);
        console.log(data);
        let data_json = JSON.parse(data);
        access_token = data_json.access_token;
        refresh_token = data_json.refresh_token;
        if (data_json.errcode) {
            console.log('刷新失败，再次刷新！');
            // return resCustom('刷新access_token失败');
            // return refreshAccessToken(refresh_token, id);
        } else {
            console.log('刷新access_token成功！');
            console.log(data_json);
            return getUserinfo(access_token, openid, req, res, params);
        }
    }, null, 'utf8').on('error', function (e) {
        console.log("Got error: " + e.message);
    });
}

//拉取用户信息(需scope为 snsapi_userinfo)
function getUserinfo(access_token, openid, req, res, params) {
    var promise = new Promise(function (resolve, reject) {
        resolve('1234');
    });
    let url = `https://api.weixin.qq.com/sns/userinfo?access_token=` + access_token + `&openid=` + openid + `&lang=zh_CN`;
    nodegrass.get(url, function (data, status, headers) {
        console.log('4.拉取用户信息');
        console.log(status);
        console.log(headers);
        console.log(data);
        let data_json = JSON.parse(data);
        if (data_json.errcode) {
            console.log('拉取用户信息，再次拉取用户信息！');
            // return resCustom('拉取用户信息失败');
            // return getUserinfo(access_token, openid);
        } else {
            // return resCustom(data_json);
            console.log('拉取用户信息成功！');
            console.log(data_json);

        }
    }, null, 'utf8').on('error', function (e) {
        console.log("Got error: " + e.message);
    });
}

module.exports = getAccessToken;