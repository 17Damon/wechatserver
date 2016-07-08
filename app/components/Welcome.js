/**
 * Created by zhubg on 16/7/7.
 */

import React from 'react';
import {Card, Progress} from 'antd';
var Welcome = React.createClass({
    show(){
        alert('1234');
    },
    handleResize(e) {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    },
    getDefaultProps(){
        return {}
    },
    getInitialState() {
        return {
            windowWidth: (typeof window !== 'undefined') ? window.innerWidth : undefined,
            windowHeight: (typeof window !== 'undefined') ? window.innerHeight : undefined,
            opacity1: 1.0,
            opacity2: 0
        };
    },
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        var int1 = setInterval(function () {
            console.dir(this);
            if (this.state.opacity1 < 0) {
                console.log('stop1');

                clearInterval(int1);

                var int2 = setInterval(function () {
                    console.dir(this);
                    if (this.state.opacity2 > 1) {
                        console.log('stop2');

                        clearInterval(int2);


                    }
                    this.setState({
                        opacity2: this.state.opacity2 + 0.05
                    });

                }.bind(this), 200);

            }
            this.setState({
                opacity1: this.state.opacity1 - 0.05
            });

        }.bind(this), 300);
    },
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    render() {
        return (
            <div
                style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
                }}
            >
                <div style={{flex:1,overflow:'hidden',height:this.state.windowHeight,padding:0,margin:0}}>
                    <div
                        style={{
                        width:(this.state.opacity1 < 0)?0:this.state.windowWidth,
                        height:(this.state.opacity1 < 0)?0:this.state.windowHeight,
                        opacity:this.state.opacity1,
                        zIndex:-1
                        }}
                    >
                        <img
                            style={{
                        width:(this.state.opacity1 < 0)?0:this.state.windowWidth,
                        height:(this.state.opacity1 < 0)?0:this.state.windowHeight,
                        opacity:this.state.opacity1
                        }}
                            src="/1234.gif"/>
                    </div>
                    <div
                        style={{
                        width:(this.state.opacity1 < 0)?0:this.state.windowWidth/2,
                        height:(this.state.opacity1 < 0)?0:this.state.windowHeight/2,
                        opacity:this.state.opacity1,
                        zIndex:10,
                        marginTop:(this.state.opacity1 < 0)?0:-(this.state.windowHeight*0.8)
                        }}
                    >
                        <img
                            style={{
                        width:(this.state.opacity1 < 0)?0:this.state.windowWidth/2,
                        height:(this.state.opacity1 < 0)?0:this.state.windowHeight/2,
                        opacity:this.state.opacity1,
                        marginLeft:this.state.windowWidth*0.25
                        }}
                            src="/567888.gif"/>
                    </div>
                    <div
                        style={{
                        width:(this.state.opacity1 < 0)?this.state.windowWidth:0,
                        height:(this.state.opacity1 < 0)?this.state.windowHeight:0,
                        opacity:this.state.opacity2,
                        zIndex:-1
                        }}
                    >
                        <img
                            style={{
                        width:(this.state.opacity1 < 0)?this.state.windowWidth:0,
                        height:(this.state.opacity1 < 0)?this.state.windowHeight:0,
                        opacity:this.state.opacity2
                        }}
                            src="/1234.png"/>
                        <img
                            style={{
                        width:(this.state.opacity1 < 0)?this.state.windowWidth:0,
                        height:(this.state.opacity1 < 0)?this.state.windowHeight:0,
                        opacity:this.state.opacity2,
                        marginTop:-(this.state.windowHeight)
                        }}
                            src="/money.png"/>
                    </div>
                    <div
                        style={{
                        width:(this.state.opacity1 < 0)?this.state.windowWidth/3:0,
                        height:(this.state.opacity1 < 0)?this.state.windowHeight/3:0,
                        opacity:this.state.opacity2,
                        zIndex:8,
                        marginTop:-(this.state.windowHeight*0.9)
                        }}
                    >
                        <img
                            style={{
                        width:(this.state.opacity1 < 0)?this.state.windowWidth/3:0,
                        height:(this.state.opacity1 < 0)?this.state.windowHeight/7:0,
                        opacity:this.state.opacity2,
                        marginLeft:this.state.windowWidth*0.35,
                        marginTop:-(this.state.windowHeight*0.1)
                        }}
                            src="/beautykorea.png"/>
                        <img
                            style={{
                        width:(this.state.opacity1 < 0)?this.state.windowWidth/3:0,
                        height:(this.state.opacity1 < 0)?this.state.windowHeight/4:0,
                        opacity:this.state.opacity2,
                        marginLeft:this.state.windowWidth*0.35,
                        marginTop:-(this.state.windowHeight*0.05)
                        }}
                            src="/66667.gif"/>
                        <img
                            style={{
                        width:(this.state.opacity1 < 0)?this.state.windowWidth/4:0,
                        height:(this.state.opacity1 < 0)?this.state.windowHeight/3:0,
                        opacity:this.state.opacity2,
                        marginLeft:this.state.windowWidth*0.38
                        // marginTop:this.state.windowHeight*0.1
                        }}
                            src="/666666.png"/>
                        <img
                            style={{
                        width:(this.state.opacity1 < 0)?this.state.windowWidth/4:0,
                        height:(this.state.opacity1 < 0)?this.state.windowHeight/7:0,
                        opacity:this.state.opacity2,
                        marginLeft:this.state.windowWidth*0.38
                        // marginTop:this.state.windowHeight*0.1
                        }}
                            src="/4615.png"/>
                        <audio src="/xqyycsd.mp3" autoPlay="autoplay" loop="loop">
                            您的浏览器不支持 audio 标签。
                        </audio>
                    </div>
                    <div
                        style={{
                        width:(this.state.opacity1 < 0)?this.state.windowWidth:0,
                        height:(this.state.opacity1 < 0)?this.state.windowHeight:0,
                        opacity:this.state.opacity2,
                        zIndex:10,
                        marginTop:-(this.state.windowHeight*0.2)
                        
                        }}
                    >
                        <img
                            style={{
                        width:(this.state.opacity1 < 0)?this.state.windowWidth/3:0,
                        height:(this.state.opacity1 < 0)?this.state.windowHeight/3:0,
                        opacity:this.state.opacity2,
                        marginLeft:-(this.state.windowWidth*0.05)
                        }}
                            src="/12345.png"/>
                        <img
                            style={{
                        width:(this.state.opacity1 < 0)?this.state.windowWidth/3:0,
                        height:(this.state.opacity1 < 0)?this.state.windowHeight/3:0,
                        opacity:this.state.opacity2,
                        marginLeft:this.state.windowWidth*0.75,
                        marginTop:-(this.state.windowHeight/2)
                        }}
                            src="/12345.png"/>
                    </div>
                </div>
            </div>
        )
    }
});
// onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
// onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
// onMouseMove onMouseOut onMouseOver onMouseUp
/* Module.exports instead of normal dom mounting */
module.exports = React.createFactory(Welcome);