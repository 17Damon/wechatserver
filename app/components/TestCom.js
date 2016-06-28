import {Modal, Button} from 'antd';

const App = React.createClass({
    handleResize(e) {
        this.setState({windowWidth: window.innerWidth});
        alert(document.getElementsByClassName("ant-affix").style.width);
    },
    getInitialState() {
        return {windowWidth: window.innerWidth};
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
                                 src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
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
                        <h3>努比亚(nubia)【3+64GB】布拉格S 皓月银 移动联通电信4G手机 双卡双待</h3>
                    </div>
                    <div>
                        <h1 style={{color:"red"}}> 1699.00&nbsp;&nbsp;元</h1>
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
                             src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>


                        <div style={{
        display:'flex',
        flexDirection: 'column',
        marginLeft:10
        }}>
                            <div style={{ width: 260 }}>
                                <Progress percent={77} strokeWidth={9} showInfo={false} status="active"/>
                            </div>
                            <div style={{ paddingTop:10 }}>
                                <div style={{
        display:'flex',
        alignItems: 'center'
        }}>
                                    <h5>ta已经获得了25个支持，还差104个支持，加油啊！</h5>
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
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;还集成了其他开源组件>还集成了其他开源组件，如fresco图片组件，okhttp网络组件等。

                        RN 会把应用的JS代码（包括依赖的framework）编译成一个js文件（一般命名为index.android.bundle), , RN的整体框架目标就是为了解释运行这个js
                        脚本文件，如果是js
                        扩展的API， 则直接通过bridge调用native方法; 如果是UI界面， 则映射到virtual DOM这个虚拟的JS数据结构中，通过bridge 传递到native ，
                        然后根据数据属性设置各个对应的真实native的View。 bridge是一种JS 和 JAVA代码通信的机制， 用bridge函数传入对方module 和
                        method即可得到异步回调的结果。

                        对于JS开发者来说， 画UI只需要画到virtual DOM 中，不需要特别关心具体的平台, 还是原来的单线程开发，还是原来HTML 组装UI（JSX），还是原来的样式模型（部分兼容
                        )。RN的界面处理除了实现View 增删改查的接口之外，还自定义一套样式表达CSSLayout，这套CSSLayout也是跨平台实现。 RN 拥有画UI的跨平台能力，主要是加入Virtual
                        DOM编程模型，该方法一方面可以照顾到JS开发者在html DOM的部分传承， 让JS 开发者可以用类似DOM编程模型就可以开发原生APP ， 另一方面则可以让Virtual
                        DOM适配实现到各个平台，实现跨平台的能力，并且为未来增加更多的想象空间， 比如react-cavas,
                        react-openGL。而实际上react-native也是从react-js演变而来。

                        对于 Android 开发者来说， RN是一个普通的安卓程序加上一堆事件响应， 事件来源主要是JS的命令。主要有二个线程，UI main thread, JS thread。 UI
                        thread创建一个APP的事件循环后，就挂在looper等待事件 , 事件驱动各自的对象执行命令。 JS thread 运行的脚本相当于底层数据采集器， 不断上传数据，转化成UI 事件，
                        通过bridge转发到UI thread, 从而改变真实的View。 后面再深一层发现， UI main thread 跟 JS thread更像是CS 模型，JS thread更像服务端，
                        UI main
                        thread是客户端， UI main thread 不断询问JS thread并且请求数据，如果数据有变，则更新UI界面。
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
                        <Button type="primary" size="large"
                                style={{flex:1,height:30,marginLeft:20,marginRight:10}} disable>支持他</Button>
                        <Button size="large" style={{flex:1,height:30,marginLeft:10,marginRight:20}}>我也要参加</Button>
                    </div>
                </div>
            </div>
        )
    }
});
