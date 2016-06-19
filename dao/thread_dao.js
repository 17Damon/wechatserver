/**
 * Created by zhubg on 2016/4/24.
 */

'use strict'

//加载util路径
module.paths.push('./util');
//permission to kill
var tokill = {tokill: ['_rev', '_id', '_key']};

//连接DB
var db = require('database');

//threadDao
function threadDao(req, res, module, method, params) {
    //code

    //promise
    console.log('threadDao');
    return dao[method](req, res, module, method, params);
}

//功能Dao--start--
let dao = {};

//insert
dao.insert = function (req, res, module, method, params) {
    //some code

    console.log('threadDao-insert')
    var aqlStr = '299';
    console.log('aqlStr:' + aqlStr);
    var AQL = `
        INSERT {value: ` + aqlStr + `} 
        IN five 
        return NEW
        `;
    console.log('AQL:' + AQL);

    //promise
    return db.query(AQL)
        .then((cursor)=> {
            return cursor.all()
        });
}

//edit
dao.edit = function (req, res, module, method, params) {
    //some code

    //promise
    return 'edit';
};

//move
dao.move = function (req, res, module, method, params) {
    console.log('threadDao-move');
    let user = JSON.stringify({
        openid: 'o7CarwEfoKMx_tWSo54kKFPtkgYA',
        nickname: '십칠오빠😏ૌ😏ૌ😏ૌ',
        sex: 1,
        language: 'zh_CN',
        city: '广州',
        province: '广东',
        country: '中国',
        headimgurl: 'http://wx.qlogo.cn/mmopen/tjyZNs9eviaibaM07clblnIKT5FfFKmXDIXGElIz4kUMRUqxVTFspQSRRN6ewybaElcteXI8hKwLSVHlibUcw4zeMTrwwXWVm0B/0',
        privilege: []
    });


    var AQL = `
            INSERT ` + user + `
            IN user
            return NEW
        `;
    console.log('AQL:' + AQL);

    //promise
    return db.query(AQL)
        .then((cursor)=> {
            return cursor.all()
        });
};

//delete
dao.delete = function (req, res, module, method, params) {
    //some code

    //promise
    return 'delete';
}

//queryAql
dao.queryAql = function (req, res, module, method, params) {
    //some code

    console.log('threadDao-queryAql')
    var aqlStr = '199';
    console.log('aqlStr:' + aqlStr);
    var AQL = `
        For i IN five 
        FILTER i.value == \'199\' 
        UPDATE i WITH { value: '250'} IN five 
        return UNSET(NEW,@tokill)
        `;
    console.log('AQL:' + AQL);
    //returns an array of result.
    return db.query(AQL, tokill)
        .then((cursor)=> {
            return cursor.all()
        });
}
//功能Dao---end---

//return
module.exports = threadDao;