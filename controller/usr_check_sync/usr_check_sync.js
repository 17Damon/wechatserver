/**
 * Created by zhubg on 2016/6/18.
 */

'use strict';

//baseServirce注册
var baseServirce = require('../../service/base_service');
var nodegrass = require('nodegrass');
//公众app信息参数
var app = require('../../util/app_setting');
var appid = app.id;
var appsecret = app.secret;
var access_token;
var refresh_token;
var openid;
//underscoreAPI
var underscore = require('underscore');


var React = require('react');
var ReactDOM = require('react-dom');

//通过code换取网页授权
function getAccessToken(req, res, module, method, params) {
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
    // return refreshAccessToken('vwRBLoAqhxjwZCsqYlwab1VMFcj9SKO-w7DGsFI5xaNgTvbWdxkr_7kcvOipgat6m8iojTYli9NolR4eFmi9TJBW6VksaE1Jys4Rmps5UQ8', req, res, params);
    return checkAccessToken('vwRBLoAqhxjwZCsqYlwab6OCWvBzqwzjVsTVKs5WbUUJGWIXnDI4oVfBox1rJWflQV05pqDRPJ9bRkCx8qG-SomsZpeFMicJmtT0MebHx_s', 'o7CarwEfoKMx_tWSo54kKFPtkgYA', req, res, params);
    //     } else {
    //         console.log('获取access_token失败');
    // params.next('微信服务器获取access_token失败异常，请重新打开链接！');
    //     }
    // }, null, 'utf8').on('error', function (e) {
    //     console.log("Got error: " + e.message);
    // params.next('微信服务器拉取用户信息异常，请重新打开链接！');

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
            console.log('access_token有效');
            return getUserinfo(access_token, openid, req, res, params);
        } else {
            console.log('access_token超时');
            return refreshAccessToken('vwRBLoAqhxjwZCsqYlwab1VMFcj9SKO-w7DGsFI5xaNgTvbWdxkr_7kcvOipgat6m8iojTYli9NolR4eFmi9TJBW6VksaE1Jys4Rmps5UQ8', req, res, params);
        }
    }, null, 'utf8').on('error', function (e) {
        console.log("Got error: " + e.message);
        params.next('微信服务器拉取用户信息异常，请重新打开链接！');
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
        params.next('微信服务器拉取用户信息异常，请重新打开链接！');
    });
}

//拉取用户信息(需scope为 snsapi_userinfo)
function getUserinfo(access_token, openid, req, res, params) {
    let url = `https://api.weixin.qq.com/sns/userinfo?access_token=` + access_token + `&openid=` + openid + `&lang=zh_CN`;
    nodegrass.get(url, function (data, status, headers) {
        console.log('4.拉取用户信息');
        console.log(status);
        console.log(headers);
        console.log(data);
        let data_json = JSON.parse(data);
        if (data_json.errcode) {
            console.log('拉取用户信息失败！');
            params.next('微信服务器拉取用户信息异常，请重新打开链接！');
        } else {
            // return resCustom(data_json);
            console.log('拉取用户信息成功！');
            console.log(data_json);
            params.openid = 'o7CarwEfoKMx_tWSo54kKFPtkgYA';
            return baseServirce(req, res, 'user', 'getUserByOpenid', params)
                .then(obj => {
                    //成功响应
                    if (obj.length === 0) {
                        //本地数据库不存在该用户信息,现在存入
                        params.user = data_json;
                        return baseServirce(req, res, 'user', 'insert', params)
                            .then(obj => {
                                //存入本地数据库成功
                                //查询同步完成，API出口
                                console.log(`存入本地数据库成功!`);
                                console.log(obj);
                                // res.json(obj);
                            })
                            //失败退出
                            .catch(params.next);
                        // throw 'no user found!';
                    } else if (obj.length === 1) {
                        console.log(`本地数据库已存在该用户记录信息，下面进行比较确定是否需要同步`);
                        console.log(underscore.isEqual(obj[0], data_json));
                        if (underscore.isEqual(obj[0], data_json)) {
                            //不同步用户信息
                            //查询同步完成，API出口
                            console.log('用户信息未发生改变，不需要同步！');
                            // res.send('1234');
                            // res.render('index', {
                            //     react: ReactDOM.renderToString(HelloMessage({name: "John"}))
                            // });
                        } else {
                            //同步用户信息
                            console.log('用户信息发生改变，需要同步！');
                            params.user = data_json;
                            return baseServirce(req, res, 'user', 'update', params)
                                .then(obj => {
                                    //查询同步完成，API出口
                                    console.log('用户信息同步完成！');
                                })
                                .catch(params.next);
                        }
                    } else {
                        console.error(`该用户openid:` + params.openid + `在本地服务器有多条记录信息，错误！`);
                        params.next(`服务器用户信息openid:` + params.openid + `异常，请截图后联系管理员！`);

                    }
                })
                //失败退出
                .catch(params.next);

        }
    }, null, 'utf8').on('error', function (e) {
        console.log("Got error: " + e.message);
    });
}

module.exports = getAccessToken;