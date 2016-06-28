/**
 * Created by zhubg on 2016/6/25.
 */

'use strict';

//加载util路径
module.paths.push('./util');
//permission to kill
var tokill = {tokill: ['_rev', '_id', '_key']};

//连接DB
var db = require('database');

//commodityDao
function commodityDao(req, res, module, method, params) {
    //code

    //promise
    console.log('commodityDao');
    return dao[method](req, res, module, method, params);
}

//功能Dao--start--
let dao = {};

//getCommodityById
dao.getCommodityById = function (req, res, module, method, params) {
    //some code
    console.log(JSON.stringify(params));
    console.log('commodityDao-getCommodityById');
    if (params.commodityid) {
        let commodityid = params.commodityid;
        console.log('commodityid:' + commodityid);
        var AQL = `
        For i in commodity
            FILTER i.commodityid == \'` + commodityid + `\' 
            return UNSET(i,@tokill)
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL, {tokill: ['_rev', '_id', '_key']})
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.commodityid Undefined!Check it!`;
    }
};

//insert
dao.insert = function (req, res, module, method, params) {
    //some code
    console.log('commodityDao-insert');
    if (params.commodity) {
        let commodity = JSON.stringify(params.commodity);
        var AQL = `
            INSERT ` + commodity + `
            IN commodity
            return NEW
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.commodity Undefined!Check it!`;
    }
};

//update
dao.update = function (req, res, module, method, params) {
    //some code
    console.log(JSON.stringify(params));
    console.log('commodityDao-update');
    if (params.commodity ) {
        let openid = params.commodity.openid;
        console.log('openid:' + openid);
        var AQL = `
        For i in commodity
            FILTER i.openid == \'` + openid + `\' 
            UPDATE i WITH `+JSON.stringify(params.commodity)+` IN commodity
            return UNSET(i,@tokill)
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL, tokill)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.openid Undefined!Check it!`;
    }
};

//edit
dao.edit = function (req, res, module, method, params) {
    //some code

    //promise
    return 'edit';
};

//move
dao.move = function (req, res, module, method, params) {
    console.log('commodityDao-move');

    //returns an array of result.
    return db.query(
        `
            For i in five
            limit 0,100
            return i
            `)
        .then((cursor)=> {
            return cursor.all()
        })

};

//deleteCommodityById
dao.deleteCommodityById = function (req, res, module, method, params) {
    //some code
    if (params.openid) {
        let openid = params.openid;
        var AQL = `
            FOR u IN commodity
            FILTER u.openid == '` + openid + `'
            REMOVE u IN commodity
            RETURN OLD
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.commodity Undefined!Check it!`;
    }
};

//queryAql
dao.queryAql = function (req, res, module, method, params) {
    //some code

    console.log('commodityDao-queryAql');
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
};
//功能Dao---end---

//return
module.exports = commodityDao;