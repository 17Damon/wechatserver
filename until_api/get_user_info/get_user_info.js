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
    // let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=` + id + `&secret=` + secret + `&code=` + code + `&grant_type=authorization_code`;
    // nodegrass.get(url, function (data, status, headers) {
    //     console.log('1.通过code换取网页授权access_token');
    //     console.log(status);
    //     console.log(headers);
    //     console.log(data);
    //     if (data.access_token) {
    //         access_token = data.access_token;
    //         refresh_token = data.refresh_token;
    //         openid = data.openid;
            id = appid;
            return checkAccessToken('vwRBLoAqhxjwZCsqYlwab4Yfgx1xdpIlmF9LIOdmR-cAV4GVf22L-pChElx4QAuXRDkfe1Kyb2aF0FevYQ40QuOJE3Hnfj2RSotx7s7C8oY', "o7CarwEfoKMx_tWSo54kKFPtkgYA");
    //     } else {
    //         console.log('获取access_token失败');
    //         return resCustom('获取access_token失败');
    //         // return getAccessToken(appid,secret,code);
    //     }
    // }, null, 'utf8').on('error', function (e) {
    //     console.log("Got error: " + e.message);
    // });
}

//检验授权凭证（access_token）是否有效
function checkAccessToken(access_token, openid) {
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
            return getUserinfo(access_token, openid);
        } else if(data_json.errcode === 42001) {
            console.log('access_token超时');
            return refreshAccessToken("vwRBLoAqhxjwZCsqYlwab1VMFcj9SKO-w7DGsFI5xaNgTvbWdxkr_7kcvOipgat6m8iojTYli9NolR4eFmi9TJBW6VksaE1Jys4Rmps5UQ8", id);
        }else {
            console.log('access_token和openid不匹配');
        }
    }, null, 'utf8').on('error', function (e) {
        console.log("Got error: " + e.message);
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
        let data_json = JSON.parse(data);
        access_token = data_json.access_token;
        refresh_token = data_json.refresh_token;
        if(data_json.errcode){
            console.log('刷新失败，再次刷新！');
            // return resCustom('刷新access_token失败');
            // return refreshAccessToken(refresh_token, id);
        }else {
            console.log('刷新access_token成功！');
            console.log(data_json);
            // return getUserinfo(access_token, openid);
        }
    }, null, 'utf8').on('error', function (e) {
        console.log("Got error: " + e.message);
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
        let data_json = JSON.parse(data);
        if (data_json.errcode){
            console.log('拉取用户信息，再次拉取用户信息！');
            // return resCustom('拉取用户信息失败');
            // return getUserinfo(access_token, openid);
        }else {
            // return resCustom(data_json);
            console.log('拉取用户信息成功！');
            console.log(data_json);
        }
    }, null, 'utf8').on('error', function (e) {
        console.log("Got error: " + e.message);
    });
}

module.exports = getAccessToken;