/**
 * Created by zhubg on 2016/6/25.
 */

'use strict';

//baseDao注册
module.paths.push('./dao');
var baseDao = require('base_dao');

//CommodityService
function commodityService(req, res, module, method, params) {
    //some code

    //promise
    console.log('commodityService');
    return service[method](req, res, module, method, params);
}

//功能Service--start--
var service = {};

//getCommodityById
service.getCommodityById = function (req, res, module, method, params) {
    //some code

    console.log('CommodityService-getCommodityById');
    //promise
    return baseDao(req, res, module, method, params);
};

//insert
service.insert = function (req, res, module, method, params) {
    //some code

    console.log('CommodityService-insert');
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
    console.log('CommodityService-update');
    //promise
    return baseDao(req, res, module, method, params);
};

//move
service.move = function (req, res, module, method, params) {
    //some code
    console.log('CommodityService-move');
    //promise
    return baseDao(req, res, module, method, params);
};

//deleteCommodityById
service.deleteCommodityById = function (req, res, module, method, params) {
    //some code
    console.log('CommodityService-deleteCommodityById');

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
module.exports = commodityService;
