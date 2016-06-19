/**
 * Created by zhubg on 2016/6/20.
 */

'use strict';

var nodegrass = require('nodegrass');
var url = `https://api.weixin.qq.com/sns/userinfo?access_token=` + 'vwRBLoAqhxjwZCsqYlwab2CJWPoZa59EpYLoDUxAYeYOWwH93R_s397XlYUJNYew-BZ4GLjA3P7ksvunlkQbz8wqMzhl6Fu_5AVcT9LgNY4' + `&openid=` + 'o7CarwEfoKMx_tWSo54kKFPtkgYA' + `&lang=zh_CN`;
;
var getJSON = function (url) {
    let promise;
    promise = new Promise(function (resolve, reject) {
        nodegrass.get(url, function (data, status, headers) {
            console.log(url);
            console.log(status);
            console.log(headers);
            console.log(data);
            let data_json = JSON.parse(data);
            if (data_json.errcode) {
                console.log('拉取用户信息，再次拉取用户信息！');
                // return resCustom('拉取用户信息失败');
                // return getUserinfo(access_token, openid);
                reject(false);
            } else {
                // return resCustom(data_json);
                console.log('拉取用户信息成功！');
                console.log(data_json);
                resolve(data_json);
            }
        }, null, 'utf8').on('error', function (e) {
            console.log("Got error: " + e.message);
            reject(false);
        });
    });
    return promise;
};

//return
module.exports = getJSON;