/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

// database connect 应用启动时已经初始化完成
var db = require('arangojs')('http://192.168.2.22:8529');
console.log('database');
db.useDatabase('myapp');

//return
module.exports = db;
