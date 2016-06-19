/**
 * Created by zhubg on 2016/5/2.
 */

'use strict'

//baseDao注册
module.paths.push('./dao');
var baseDao = require('base_dao');

//threadService
function permissionService(req, res, module, method) {
    //some code

    //promise
    console.log('permissionService');

    //can not find methodService
    if (!service[method]) {
        console.log('permissionService can not find service[' + method + ']');
        return Promise.reject(
            'permissionService can not find service[' + method + ']'
        );
    }
    
    return service[method](req, res, module, method);
}

//功能Service--start--
var service = {};

//query
service.query = function (req, res, module, method) {
    //some code

    //promise
    return baseDao(req, res, module, method);
}

//query
service.go = function (req, res, module, method) {
    //some code

    //promise
    return baseDao(req, res, module, method);
}

//queryAql
service.queryAql = function (req, res, module, method) {
    //some code

    //promise
    return baseDao(req, res, module, method);
}

//功能Service---end---

//return
module.exports = permissionService;
