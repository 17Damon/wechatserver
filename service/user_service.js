/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

//baseDao注册
module.paths.push('./dao');
var baseDao = require('base_dao');

//UserService
function UserService(req, res, module, method, params) {
    //some code

    //promise
    console.log('UserService');
    return service[method](req, res, module, method, params);
}

//功能Service--start--
var service = {};

//getUserByOpenid
service.getUserByOpenid = function (req, res, module, method, params) {
    //some code

    console.log('UserService-getUserByOpenid');
    //promise
    return baseDao(req, res, module, method, params);
};

//insert
service.insert = function (req, res, module, method, params) {
    //some code

    console.log('UserService-insert');
    //promise
    return baseDao(req, res, module, method, params);
};

//edit
service.edit = function (req, res, module, method, params) {
    //some code

    //promise
    return baseDao(req, res, module, method, params);
};

//update
service.update = function (req, res, module, method, params) {
    //some code
    console.log('UserService-update');
    //promise
    return baseDao(req, res, module, method, params);
};

//move
service.move = function (req, res, module, method, params) {
    //some code
    console.log('UserService-move');
    //promise
    return baseDao(req, res, module, method, params);
};

//deleteUserByOpenid
service.deleteUserByOpenid = function (req, res, module, method, params) {
    //some code
    console.log('UserService-deleteUserByOpenid');

    //promise
    return baseDao(req, res, module, method, params);
};

//queryAql
service.queryAql = function (req, res, module, method, params) {
    //some code

    //promise
    return baseDao(req, res, module, method, params);
};

//功能Service---end---

//return
module.exports = UserService;
