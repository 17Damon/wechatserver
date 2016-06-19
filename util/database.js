/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

// database connect 应用启动时已经初始化完成
var db = require('arangojs')('http://127.0.0.1:8529');
console.log('database');
db.useDatabase('myapp');

//return
module.exports = db;
