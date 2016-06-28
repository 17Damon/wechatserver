/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

//加载controller路径
module.paths.push('./controller');

//allController注册
var controller = {};
controller.user = require('user_controller');
controller.thread = require('thread_controller');
controller.permission = require('permission_controller');
controller.commodity = require('commodity_controller');
controller.performer = require('performer_controller');

//baseController
//调度指向参数module, method
function baseController(req, res, module, method, params) {
    //code
    //权限校验
    if (!controller.permission(req, res, 'permission', 'go')) {
        return Promise.reject(
            'Permission can not [' + module + ']&&' + '[' + method + ']'
        )
    }

    //promise
    console.log('baseController');

    //can not find controller
    if (!controller[module]) {
        console.log('baseController can not find controller[' + module + ']');
        //在then 中  等价 throw
        //     return Promise.reject(
        //         'baseController can not find controller[' + module + ']'

        throw    'baseController can not find controller[' + module + ']'
    }
    return controller[module](req, res, module, method,params);
    // })
}

//return
module.exports = baseController;