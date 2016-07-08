/**
 * Created by zhubg on 16/7/7.
 */

var ReactDOMServer = require('react-dom/server'),
    React = require('react'),
    ReactApp = require('../components/Welcome');
var baseController = require('../../controller/base_controller');


module.exports = function (server) {
    server.get('/welcome:welcomeid', function (req, res, next) {
        // React.renderToString takes your component
        console.log(req.params.welcomeid);
        if(!req.params.welcomeid || !(req.params.welcomeid === '000001')){
            res.send('非法操作!');
        }else {
                    //参数一次传送完毕
                    let completeParams = {};
                    console.dir(completeParams);
                    //服务器端同构渲染参数
                    let reactHtml = ReactDOMServer.renderToString(<ReactApp completeParams={completeParams}/>);
                    //向客户端响应参数必须把Object转为String
                    res.render('index.ejs', {reactOutput: reactHtml, completeParams: JSON.stringify(completeParams)});
               
        }
    });
};
