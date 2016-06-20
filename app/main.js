/** @jsx React.DOM */

var React = require('react');
var ReactDOM  =require('react-dom');
var ReactApp = require('./components/ReactApp');
var reactApp = React.createFactory(ReactApp);
var mountNode = document.getElementById('react-main-mount');

ReactDOM.render(reactApp({}), mountNode);
