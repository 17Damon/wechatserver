/**
 * Created by zhubg on 2016/6/20.
 */

'use strict';

var underscore = require('underscore');

var stooge = { sex: 1,
    language: 'zh_CN',
    city: '广州',
    province: '广东',
    country: '中国',
    openid: 'o7CarwEfoKMx_tWSo54kKFPtkgYA',
    nickname: '십칠오빠😏ૌ😏ૌ😏ૌ',
    headimgurl: 'http://wx.qlogo.cn/mmopen/tjyZNs9eviaibaM07clblnIKT5FfFKmXDIXGElIz4kUMRUqxVTFspQSRRN6ewybaElcteXI8hKwLSVHlibUcw4zeMTrwwXWVm0B/0',
    privilege: [] };
var clone  = { openid: 'o7CarwEfoKMx_tWSo54kKFPtkgYA',
    nickname: '십칠오빠😏ૌ😏ૌ😏ૌ',
    sex: 1,
    language: 'zh_CN',
    city: '广州',
    province: '广东',
    country: '中国',
    headimgurl: 'http://wx.qlogo.cn/mmopen/tjyZNs9eviaibaM07clblnIKT5FfFKmXDIXGElIz4kUMRUqxVTFspQSRRN6ewybaElcteXI8hKwLSVHlibUcw4zeMTrwwXWVm0B/0',
    privilege: [] };
// stooge = clone;
console.log(underscore.isEqual(stooge, clone));



