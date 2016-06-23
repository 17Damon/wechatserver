// var React = require('react');
import React from 'react';
import {Modal,Button} from 'antd';


/* create factory with griddle component */
// var Griddle = React.createFactory(require('griddle-react'));

// var fakeData = require('../data/fakeData.js').fakeData;
// var columnMeta = require('../data/columnMeta.js').columnMeta;
// var resultsPerPage = 200;

var ReactApp = React.createClass({
    show: function () {
        alert('You clicked!');
    },
    getInitialState() {
        return { visible: false };
    },
    showModal() {
        this.setState({
            visible: true
        });
    },
    handleOk() {
        console.log('点击了确定');
        this.setState({
            visible: false
        });
    },
    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false
        });
    },
    componentDidMount: function () {
        // console.log(fakeData);

    },
    render: function () {
        return (
            <div>
                {/*组件服务器客户端同构渲染必须使用props*/}
                <h2>{this.props.number}</h2>
                <div>
                    <Button type="primary" onClick={this.showModal} >Primary</Button>
                    <Modal title="第一个 Modal" visible={this.state.visible}
                           onOk={this.handleOk} onCancel={this.handleCancel}
                    >
                        <p>对话框的内容</p>
                        <p>对话框的内容</p>
                        <p>对话框的内容</p>
                    </Modal>
                </div>
                {/*<audio controls="controls">
                 <source src="http://120.27.124.108/source/1234.mp3" type="audio/mp3" />
                 Your browser does not support this audio format.
                 </audio>*/}
            </div>
        )
    }
});

/* Module.exports instead of normal dom mounting */
module.exports = React.createFactory(ReactApp);