/** @jsx React.DOM */

var ReactDOM  =require('react-dom');
var ReactApp = require('./components/ReactApp');
var mountNode = document.getElementById('react-main-mount');

//客户端同构渲染参数initProps.num
ReactDOM.render(ReactApp({number:initProps.num}), mountNode);
