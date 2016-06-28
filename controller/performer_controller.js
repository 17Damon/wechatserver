/**
 * Created by zhubg on 2016/6/27.
 */

'use strict';

var getAccessToken = require('./usr_check_sync/usr_check_sync');

//baseServirce注册
module.paths.push('./service');

var baseServirce = require('base_service');
//performerController
function performerController(req,res,module,method, params ) {
    //some code


    console.log('performerController');
    //promise
    return controller[method](req,res,module,method, params);
}

//功能--start--
var controller = {};

//check_sync_performer_info
controller.checkSyncPerformerInfo = function (req,res,module,method, params) {
    //some code

    console.log('performerController-checkSyncPerformerInfo');
    //promise
    return getAccessToken(req,res,module,method, params);
};

//getperformer_by_openid
controller.getPerformerById = function (req,res,module,method, params) {
    //some code

    console.log('performerController-getPerformerById');
    //promise
    return baseServirce(req,res,module,method, params);
};

//insert
controller.insert = function (req,res,module,method, params) {
    //some code

    console.log('performerController-insert');
    //promise
    return baseServirce(req,res,module,method, params);
};

//supportOnce
controller.supportOnce = function (req,res,module,method, params) {
    //some code

    console.log('performerController-supportOnce');
    //promise
    return baseServirce(req,res,module,method, params);
};

//update
controller.update = function (req,res,module,method, params) {
    //some code

    console.log('performerController-update');
    //promise
    return baseServirce(req,res,module,method, params);
};


//edit
controller.edit = function (req,res,module,method, params) {
    //some code

    //promise
    return baseServirce(req,res,module,method, params);
};

//move
controller.move = function (req,res,module,method, params) {
    //some code

    console.log('performerController-move');
    //promise
    return baseServirce(req,res,module,method, params);
};

//deletePerformerByOpenid
controller.deletePerformerByOpenid = function (req,res,module,method, params) {
    //some code

    //promise
    return baseServirce(req,res,module,method, params);
};

//queryAql
controller.queryAql = function (req,res,module,method, params) {
    //some code

    //promise
    return baseServirce(req,res,module,method, params);
};

//return
module.exports = performerController;