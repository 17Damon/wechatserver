/**
 * Created by zhubg on 2016/6/27.
 */

'use strict';

//加载util路径
module.paths.push('./util');
//permission to kill
var tokill = {tokill: ['_rev', '_id', '_key']};

//连接DB
var db = require('database');

//performerDao
function performerDao(req, res, module, method, params) {
    //code

    //promise
    console.log('performerDao');
    return dao[method](req, res, module, method, params);
}

//功能Dao--start--
let dao = {};

//getPerformerById
dao.getPerformerById = function (req, res, module, method, params) {
    //some code
    console.log(JSON.stringify(params));
    console.log('performerDao-getPerformerById');
    if (params.performerid) {
        let performerid = params.performerid;
        console.log('performerid:' + performerid);
        var AQL = `
FOR p IN performer
            FILTER p.performerid == '` + performerid + `'
LET u =(
		FOR u IN user
  			FILTER p.owneropenid == u.openid
		RETURN UNSET(u, ['_rev', '_id', '_key'])
)

LET c =(
		FOR c IN commodity  
  			FILTER p.commodityid == c.commodityid
		RETURN UNSET(c, ['_rev', '_id', '_key'])
)

LET su =(
  		FOR s IN p.supportlist  
      			FOR su IN user
				FILTER s == su.openid 
		RETURN UNSET(su, ['_rev', '_id', '_key'])
)
 	
RETURN UNSET(merge(p, {commodity: c[0]},{owneruser: u[0]},{supportlist: su}), ['_rev', '_id', '_key'])
`;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.performerid Undefined!Check it!`;
    }
};

//insert
dao.insert = function (req, res, module, method, params) {
    //some code
    console.log('performerDao-insert');
    if (params.performer) {
        let performer = JSON.stringify(params.performer);
        var AQL = `
            INSERT ` + performer + `
            IN performer
            return NEW
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.performer Undefined!Check it!`;
    }
};


//supportOnce
dao.supportOnce = function (req, res, module, method, params) {
    //some code
    console.log(JSON.stringify(params));
    console.log('performerDao-supportOnce');
    if (params.performerid && params.openid) {
        let performerid = params.performerid;
        let openid = params.openid;
        console.log('performerid:' + performerid);
        var AQL = `
        For i in performer
            FILTER i.performerid == \'` + performerid + `\' 
            UPDATE i WITH { 
			supportamount:i.supportamount+1,
			supportlist:PUSH(i.supportlist,\'` + openid + `\',true)
			} IN performer
            return UNSET(NEW,@tokill)
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL, tokill)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.openid or params.performerid Undefined!Check it!`;
    }
};


//update
dao.update = function (req, res, module, method, params) {
    //some code
    console.log(JSON.stringify(params));
    console.log('performerDao-update');
    if (params.performer) {
        let openid = params.performer.openid;
        console.log('openid:' + openid);
        var AQL = `
        For i in performer
            FILTER i.openid == \'` + openid + `\' 
            UPDATE i WITH ` + JSON.stringify(params.performer) + ` IN performer
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
    console.log('performerDao-move');

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

//deletePerformerById
dao.deletePerformerById = function (req, res, module, method, params) {
    //some code
    if (params.openid) {
        let openid = params.openid;
        var AQL = `
            FOR u IN performer
            FILTER u.openid == '` + openid + `'
            REMOVE u IN performer
            RETURN OLD
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.performer Undefined!Check it!`;
    }
};

//queryAql
dao.queryAql = function (req, res, module, method, params) {
    //some code

    console.log('performerDao-queryAql');
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
module.exports = performerDao;