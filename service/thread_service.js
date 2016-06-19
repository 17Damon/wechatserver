/**
 * Created by zhubg on 2016/4/24.
 */

'use strict'

//baseDao注册
module.paths.push('./dao');
var baseDao = require('base_dao');

//threadService
function threadService(req, res, module, method) {
    //some code
    
    //promise
    console.log('threadService');
    return service[method](req, res, module, method);
}

//功能Service--start--
var service = {};

//insert
service.insert = function (req, res, module, method) {
    //some code
    
    console.log('threadService-insert');
    //promise
    return baseDao(req, res, module, method);
}

//edit
service.edit = function (req, res, module, method) {
    //some code

    //promise
    return baseDao(req, res, module, method);
}

//move
service.move = function (req, res, module, method) {
    //some code
    console.log('threadService-move');
    //promise
    return baseDao(req, res, module, method);
}

//delete
service.delete = function (req, res, module, method) {
    //some code

    //promise
    return 'delete';
}

//queryAql
service.queryAql = function (req, res, module, method) {
    //some code
        
    //promise
    return baseDao(req, res, module, method);
}

//功能Service---end---

//return
module.exports = threadService;
