// var React = require('react');
import React from 'react';
import {Card, Progress} from 'antd';

var ReactApp = React.createClass({
    support(){
        //支持
        if (!this.state.supportFlag && !this.state.ownerFlag && !this.state.accomplishFlag) {
            this.setState({supportamount: this.state.supportamount + 1});
            this.setState({supportFlag: true});
            if (this.state.supportamount + 1 === this.props.completeParams.performer.commodity.price) {
                this.setState({accomplishFlag: true});
            }
        } else {
            alert('非法操作 !');
        }
        if(self.fetch) {
            // run my fetch request here
            let url = `/test?performerid=`+ 
                this.props.completeParams.performer.performerid +`&openid=`+
                this.props.completeParams.openid;
            fetch(url)
                .then(function(response) {
                    console.log('response: ', response);
                    console.log('header: ', response.headers.get('Content-Type'));
                    return response.text();
                }).then(function(text) {
                console.log('got text: ', text);
            }).catch(function(ex) {
                console.log('failed: ', ex);
            })
        } else {
            // do something with XMLHttpRequest?
            alert('no-fetch!!!');
        }

    },
    supportString() {
        if (this.state.accomplishFlag) {
            return "恭喜";
        } else if (this.state.ownerFlag) {
            return "您的活动";
        }
        else {
            return this.state.supportFlag ? "您已支持 " : "支持他";
        }
    },
    partake(){
        //参与
        alert('click partake!');
        if (!this.state.ownerFlag && !this.state.joinFlag) {
            this.setState({joinFlag: true});
        } else {
            alert("非法操作！");
        }
    },
    partakeString () {
        if (this.state.accomplishFlag && this.state.ownerFlag) {
            return "目标达成";
        } else {
            return this.state.ownerFlag || this.state.joinFlag ? "正在进行 " : "我也要参加";
        }
    },
    handleResize(e) {
        this.setState({windowWidth: window.innerWidth});
    },
    getDefaultProps(){
        return {}
    },
    getInitialState() {
        return {
            windowWidth: (typeof window !== 'undefined') ? window.innerWidth : undefined,
            ownerFlag: this.props.completeParams.ownerFlag,
            supportFlag: this.props.completeParams.supportFlag,
            joinFlag: this.props.completeParams.joinFlag,
            accomplishFlag: this.props.completeParams.accomplishFlag,
            supportamount: this.props.completeParams.performer.supportamount
        };
    },
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);

    },
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    render() {
        return (
            <div>
                <div style={{position: 'fixed', top: 0, left: 0, width: this.state.windowWidth,zIndex: 10}}>
                    <div
                        style={{
            display:'flex',
            height:35,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'rgba(0, 0, 0, 0.5)'
        }}>
                        <div>
                            <h1 style={{color:'#FFF',fontWeight:'bold'}}>BTW</h1>
                        </div>
                    </div>
                </div>


                <div style={{
        display:'flex',
        height:390,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#FAE5D3',
        borderBottomStyle:'solid'
        }}>
                    <Card style={{ width: 270,marginTop:30 }} bodyStyle={{ padding: 0 }}>
                        <div className="custom-image">
                            <img alt="example" width="100%"
                                 src={this.props.completeParams.performer.commodity.commodityimgurl}/>
                        </div>
                        <div className="custom-card">
                        </div>
                    </Card>
                </div>
                <div style={{
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#FAE5D3',
        borderBottomStyle:'solid',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
        }}>
                    <div>
                        <h3>{this.props.completeParams.performer.commodity.commodityname}</h3>
                    </div>
                    <div>
                        <h1 style={{color:"red"}}> {this.props.completeParams.performer.commodity.price}&nbsp;&nbsp;元</h1>
                    </div>
                </div>
                <div style={{
        display:'flex',
        height:100,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#FAE5D3',
        borderBottomStyle:'solid',
        flexDirection: 'row'
        }}>

                    <div style={{display:'flex'}}>

                        <img style={{
          borderWidth:1,
          borderStyle:'solid',
          borderColor:'silver',
          height:50,
          width:50,
          borderRadius:25
          }}
                             src={this.props.completeParams.performer.owneruser.headimgurl}/>


                        <div style={{
        display:'flex',
        flexDirection: 'column',
        marginLeft:10
        }}>
                            <div style={{ width: 260 }}>
                                <Progress
                                    percent={parseInt(this.state.supportamount/this.props.completeParams.performer.commodity.price*100)}
                                    strokeWidth={9}
                                    showInfo={true}
                                />
                            </div>
                            <div style={{ paddingTop:10 }}>
                                <div style={{
        display:'flex',
        alignItems: 'center'
        }}>
                                    <h5>
                                        ta已经获得了{this.state.supportamount}个支持，还差{this.props.completeParams.performer.commodity.price - this.state.supportamount}个支持，加油啊！</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
          display:'flex',
          paddingLeft:25,
          paddingRight:25,
          paddingTop:10,
          height:390,
          flexDirection: 'column'
          }}>
                    <h4 style={{fontWeight:'bold'}}> 说明介绍：&nbsp;&nbsp;</h4>
                    <h5>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.completeParams.performer.commodity.direction}
                    </h5>
                </div>

                <div style={{
            display:'flex',
            height:70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'rgba(0, 0, 0, 0.5)',
            flexDirection: 'column'
          }}>
                    <h5 style={{color:'#FFF',fontWeight:'bold'}}>
                        Power by ElfDragonTech
                    </h5>
                    <h5 style={{color:'#FFF',fontWeight:'bold'}}>
                        61008596@qq.com</h5>
                </div>
                <div
                    style={{
            display:'flex',
            height:45
        }}></div>


                <div style={{position: 'fixed', bottom: 0, left: 0, width: this.state.windowWidth,zIndex: 10}}>
                    <div
                        style={{
            display:'flex',
            height:45,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'rgba(0, 0, 0, 0.5)'
        }}>
                        <button style={{flex:1,height:30,marginLeft:20,marginRight:10}} type="button"
                                onClick={((!this.state.supportFlag && !this.state.ownerFlag && !this.state.accomplishFlag) ? this.support : undefined)}
                                className={"ant-btn ant-btn-primary ant-btn-lg " + ((this.state.ownerFlag || this.state.accomplishFlag || this.state.supportFlag )? "disabled " : " ")}
                        >
                            {this.supportString()}
                        </button>

                        <button style={{flex:1,height:30,marginLeft:10,marginRight:20}} type="button"
                                onClick={(this.state.ownerFlag || this.state.joinFlag || ( this.state.accomplishFlag && this.state.ownerFlag)? undefined : this.partake)}
                                className={"ant-btn ant-btn-primary ant-btn-lg " + ((this.state.ownerFlag || this.state.joinFlag || (this.state.accomplishFlag && this.state.ownerFlag))? "disabled " : " ")}
                        >
                            {this.partakeString()}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
});

/* Module.exports instead of normal dom mounting */
module.exports = React.createFactory(ReactApp);