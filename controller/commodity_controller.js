/**
 * Created by zhubg on 2016/6/25.
 */

'use strict';

var getAccessToken = require('./usr_check_sync/usr_check_sync');

//baseServirce注册
module.paths.push('./service');

var baseServirce = require('base_service');
//commodityController
function commodityController(req,res,module,method, params ) {
    //some code


    console.log('commodityController');
    //promise
    return controller[method](req,res,module,method, params);
}

//功能--start--
var controller = {};

//check_sync_commodity_info
controller.checkSyncCommodityInfo = function (req,res,module,method, params) {
    //some code

    console.log('commodityController-checkSyncCommodityInfo');
    //promise
    return getAccessToken(req,res,module,method, params);
};

//getcommodity_by_openid
controller.getCommodityById = function (req,res,module,method, params) {
    //some code

    console.log('commodityController-getCommodityById');
    //promise
    return baseServirce(req,res,module,method, params);
};

//insert
controller.insert = function (req,res,module,method) {
    //some code

    console.log('commodityController-insert');
    //promise
    return baseServirce(req,res,module,method);
};

//update
controller.update = function (req,res,module,method) {
    //some code

    console.log('commodityController-insert');
    //promise
    return baseServirce(req,res,module,method);
};


//edit
controller.edit = function (req,res,module,method) {
    //some code

    //promise
    return 'edit';
};

//move
controller.move = function (req,res,module,method) {
    //some code

    console.log('commodityController-move');
    //promise
    return baseServirce(req,res,module,method);
};

//deleteCommodityByOpenid
controller.deleteCommodityByOpenid = function (req,res,module,method, params) {
    //some code

    //promise
    return baseServirce(req,res,module,method, params);
};

//queryAql
controller.queryAql = function (req,res,module,method) {
    //some code

    //promise
    return baseServirce(req,res,module,method);
};

//return
module.exports = commodityController;