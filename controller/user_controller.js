/**
 * Created by zhubg on 2016/4/24.
 */
'use strict';

var getAccessToken = require('./usr_check_sync/usr_check_sync');

//baseServirce注册
module.paths.push('./service');

var baseServirce = require('base_service');
//userController
function userController(req,res,module,method, params ) {
    //some code


    console.log('userController');
    //promise
    return controller[method](req,res,module,method, params);
}

//功能--start--
var controller = {};

//check_sync_user_info
controller.checkSyncUserInfo = function (req,res,module,method, params) {
    //some code

    console.log('userController-checkSyncUserInfo');
    //promise
    return getAccessToken(req,res,module,method, params);
};

//getuser_by_openid
controller.getUserByOpenid = function (req,res,module,method, params) {
    //some code

    console.log('userController-getUserByOpenid');
    //promise
    return baseServirce(req,res,module,method, params);
};

//getUserByCode
controller.getUserByCode = function (req,res,module,method, params) {
    //some code

    console.log('userController-getUserByCode');
    //promise
    return baseServirce(req,res,module,method, params);
};

//insert
controller.insert = function (req,res,module,method, params) {
    //some code

    console.log('userController-insert');
    //promise
    return baseServirce(req,res,module,method, params);
};

//update
controller.update = function (req,res,module,method, params) {
    //some code

    console.log('userController-insert');
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

    console.log('userController-move');
    //promise
    return baseServirce(req,res,module,method, params);
};

//deleteUserByOpenid
controller.deleteUserByOpenid = function (req,res,module,method, params) {
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
module.exports = userController;