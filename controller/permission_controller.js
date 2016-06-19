/**
 * Created by zhubg on 2016/5/2.
 */

'use strict'

//baseServirce注册
module.paths.push('./service');
var baseServirce = require('base_service');

//permissionController
function permissionController(req,res,module,method) {
    //some code

    //promise
    console.log('permissionController');
    return controller[method](req,res,module,method);
}

//功能--start--
var controller = {};

//go
controller.go = function (req, res,module,method) {
    //some code

    //promise
    return baseServirce(req, res,module,method);
}

//query
controller.query = function (req, res,module,method) {
    //some code

    //promise
    return baseServirce(req, res,module,method);
}

//queryAql
controller.queryAql = function (req, res,module,method) {
    //some code

    //promise
    return baseServirce(req, res,module,method);
}

//功能Controller---end---

//return
module.exports = permissionController;