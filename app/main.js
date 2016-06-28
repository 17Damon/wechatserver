
var ReactDOM  =require('react-dom');
var ReactApp = require('./components/ReactApp');
var mountNode = document.getElementById('react-main-mount');

//客户端同构渲染参数initProps.num
ReactDOM.render(ReactApp({completeParams:initProps.completeParams}), mountNode);

//<script src="//cdn.bootcss.com/react/0.14.7/react.min.js"></script>
