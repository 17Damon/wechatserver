/**
 * Created by zhubg on 2016/6/18.
 */

'use strict';

var nodegrass = require('nodegrass');
var access_token;
var refresh_token;
var openid;
var id;
var effect_flag = false;

//通过code换取网页授权
function getAccessToken(appid, secret, code,res) {
    var resCustom = function(obj){
        res.send(obj);
    };
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=` + id + `&secret=` + secret + `&code=` + code + `&grant_type=authorization_code`;
    nodegrass.get(url, function (data, status, headers) {
        console.log('1.通过code换取网页授权access_token');
        console.log(status);
        console.log(headers);
        console.log(data);
        if (data.access_token) {
            access_token = data.access_token;
            refresh_token = data.refresh_token;
            openid = data.openid;
            id = appid;
            return checkAccessToken(access_token, openid);
        } else {
            console.log('获取access_token失败');
            // return resCustom('获取access_token失败');
            return getAccessToken(appid,secret,code);
        }
    }, null, 'utf8').on('error', function (e) {
        console.log("Got error: " + e.message);
        throw e;
    });
}

//检验授权凭证（access_token）是否有效
function checkAccessToken(access_token, openid) {
    let url = `https://api.weixin.qq.com/sns/auth?access_token=` + access_token + `&openid=` + openid;
    nodegrass.get(url, function (data, status, headers) {
        console.log('2.检验授权凭证（access_token）是否有效');
        console.log(status);
        console.log(headers);
        console.log(data);
        if (data.errcode === 0) {
            effect_flag = true;
            return getUserinfo(access_token, openid);
        } else {
            return refreshAccessToken(refresh_token, id);
        }
    }, null, 'utf8').on('error', function (e) {
        console.log("Got error: " + e.message);
        throw e;
    });

}

//刷新access_token
function refreshAccessToken(refresh_token, id) {
    let url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=` + id + `&grant_type=refresh_token&refresh_token=` + refresh_token;
    nodegrass.get(url, function (data, status, headers) {
        console.log('3.刷新access_token');
        console.log(status);
        console.log(headers);
        console.log(data);
        access_token = data.access_token;
        refresh_token = data.refresh_token;
        if(errcode){
            console.log('刷新失败，再次刷新！');
            return refreshAccessToken(refresh_token, id);
        }else {
            return getUserinfo(access_token, openid);
        }
    }, null, 'utf8').on('error', function (e) {
        console.log("Got error: " + e.message);
        throw e;
    });
}

//拉取用户信息(需scope为 snsapi_userinfo)
function getUserinfo(access_token, openid) {
    let url = `https://api.weixin.qq.com/sns/userinfo?access_token=` + access_token + `&openid=` + openid + `&lang=zh_CN`;
    nodegrass.get(url, function (data, status, headers) {
        console.log('4.拉取用户信息');
        console.log(status);
        console.log(headers);
        console.log(data);
        if (errcode){
            console.log('拉取用户信息，再次拉取用户信息！');
            return getUserinfo(access_token, openid);
        }else {
            return resCustom(data);
        }
    }, null, 'utf8').on('error', function (e) {
        console.log("Got error: " + e.message);
        throw e;
    });
}

module.exports = getAccessToken;