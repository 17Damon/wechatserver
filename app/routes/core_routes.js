var ReactDOMServer = require('react-dom/server'),
    React = require('react'),
    ReactApp = require('../components/ReactApp');
var baseController = require('../../controller/base_controller');


module.exports = function (server) {
    server.get('/btw/performer', function (req, res, next) {
        // React.renderToString takes your component
        if(!req.session.openid && req.session.performerid){
            res.send('请使用微信客户端登陆!');
        }else {
            let performer = {};
            //获取session.openid  B,F,H,J
            let openid = req.session.openid;
            //初始化params参数集为空
            let params = {};
            params.performerid = req.session.performerid;
            baseController(req, res, 'performer', 'getPerformerById', params)
                .then(obj=> {
                    performer = obj[0];
                    console.log('let us see what\'in supportlist! ');
                    console.dir(obj[0].supportlist);
                    //组件标志参数
                    //是否活动的发起者
                    let ownerFlag = (performer.owneropenid === openid);
                    //是否已经支持
                    let supportFlag = false;
                    console.log('start judge supportFlag');
                    for (let i of performer.supportlist) {
                        console.log(`i: `+i+`i.openid: `+i.openid);
                        if (i.openid === openid) {
                            supportFlag = true;
                        }
                    }
                    //是否已经达成目标
                    let accomplishFlag = (performer.supportamount === performer.commodity.price);
                    // }
                    //是否已经参与过该活动  还未实现
                    let joinFlag = false;
                    //参数一次传送完毕
                    let completeParams = {};
                    completeParams.openid = openid;
                    completeParams.performer = performer;
                    completeParams.ownerFlag = ownerFlag;
                    completeParams.supportFlag = supportFlag;
                    completeParams.accomplishFlag = accomplishFlag;
                    completeParams.joinFlag = joinFlag;
                    console.dir(completeParams);
                    //服务器端同构渲染参数
                    let reactHtml = ReactDOMServer.renderToString(<ReactApp completeParams={completeParams}/>);
                    //向客户端响应参数必须把Object转为String
                    res.render('index.ejs', {reactOutput: reactHtml, completeParams: JSON.stringify(completeParams)});
                })
                .catch(next);
        }
    });
};
