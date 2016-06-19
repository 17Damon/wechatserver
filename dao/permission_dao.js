/**
 * Created by zhubg on 2016/5/2.
 */

'use strict'

//加载util路径
module.paths.push('./util');
//permission to kill
var tokill = {tokill: ['_rev','_id','_key']};

//连接DB
var db = require('database');

//permissionDao
function permissionDao(req, res, module, method) {
    //code

    //promise
    console.log('permissionDao');
    return dao[method](req, res, module, method);
}

//功能Dao--start--
let dao = {};

//queryAql
dao.query = function (req, res, module, method) {
    //some code

    console.log('permissionDao-query')
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
    return db.query(AQL,tokill)
        .then((cursor)=> {
            return cursor.all()
        });
}

//go_test
dao.go = function (req, res, module, method) {
    //some code
    console.log('permissionDao-go');
    return true;
}

//queryAql
dao.queryAql = function (req, res, module, method) {
    //some code

    console.log('permissionDao-queryAql')
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
    return db.query(AQL,tokill)
        .then((cursor)=> {
            return cursor.all()
        });
}
//功能Dao---end---

//return
module.exports = permissionDao;