/** @jsx React.DOM */

var React = require('react');

/* create factory with griddle component */
var Griddle = React.createFactory(require('griddle-react'));

// var fakeData = require('../data/fakeData.js').fakeData;
// var columnMeta = require('../data/columnMeta.js').columnMeta;
// var resultsPerPage = 200;

var ReactApp = React.createClass({
      show:function () {
          alert('You clicked!');
      },

      componentDidMount: function () {
        // console.log(fakeData);

      },
      render: function () {
        return (
          <div id="table-area" onClick={this.show}>
              //组件服务器客户端同构渲染必须使用props
              <h2>{this.props.number}</h2>

              <audio controls="controls">
                  <source src="http://120.27.124.108/source/1234.mp3" type="audio/mp3" />
                  Your browser does not support this audio format.
              </audio>
          </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = ReactApp;