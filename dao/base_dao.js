/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

//加载util路径
module.paths.push('./dao');

//allDao注册
var dao = {};
dao.user = require('user_dao');
dao.thread = require('thread_dao');
dao.permission = require('permission_dao');
dao.commodity = require('commodity_dao');
dao.performer = require('performer_dao');

//baseDao
function baseDao(req, res, module, method, params) {

    //promise
    console.log('baseDao');

    //can not find dao
    if(!dao[module]) {
        console.log('baseDao can not find dao['+module+']');
        return Promise.reject(
            'baseDao can not find dao['+module+']'
        );
    }

    return dao[module](req, res, module, method, params);
}

//return
module.exports = baseDao;
