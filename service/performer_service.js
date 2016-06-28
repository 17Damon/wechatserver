/**
 * Created by zhubg on 2016/6/27.
 */

'use strict';

//baseDao注册
module.paths.push('./dao');
var baseDao = require('base_dao');

//PerformerService
function performerService(req, res, module, method, params) {
    //some code

    //promise
    console.log('performerService');
    return service[method](req, res, module, method, params);
}

//功能Service--start--
var service = {};

//getPerformerById
service.getPerformerById = function (req, res, module, method, params) {
    //some code

    console.log('PerformerService-getPerformerById');
    //promise
    return baseDao(req, res, module, method, params);
};

//insert
service.insert = function (req, res, module, method, params) {
    //some code

    console.log('PerformerService-insert');
    //promise
    return baseDao(req, res, module, method, params);
};

//edit
service.edit = function (req, res, module, method, params) {
    //some code

    //promise
    return baseDao(req, res, module, method, params);
};


//supportOnce
service.supportOnce = function (req, res, module, method, params) {
    //some code
    console.log('PerformerService-supportOnce');
    //promise
    return baseDao(req, res, module, method, params);
};


//update
service.update = function (req, res, module, method, params) {
    //some code
    console.log('PerformerService-update');
    //promise
    return baseDao(req, res, module, method, params);
};

//move
service.move = function (req, res, module, method, params) {
    //some code
    console.log('PerformerService-move');
    //promise
    return baseDao(req, res, module, method, params);
};

//deletePerformerById
service.deletePerformerById = function (req, res, module, method, params) {
    //some code
    console.log('PerformerService-deletePerformerById');

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
module.exports = performerService;
