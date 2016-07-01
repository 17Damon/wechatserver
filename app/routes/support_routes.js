/**
 * Created by zhubg on 2016/6/28.
 */

var baseController = require('../../controller/base_controller');


module.exports = function (server) {
    server.get('/btw/performer/support', function (req, res, next) {
        if(req.query.openid && req.query.performerid) {
            // React.renderToString takes your component
            let params = {};
            console.log('What\'s in params !');
            console.dir(params);
            //当前登陆者的openid
            params.openid = req.query.openid;
            //活动编号
            params.performerid = req.query.performerid;
            console.dir(params);
            baseController(req, res, 'performer', 'supportOnce', params)
                .then(obj=> {
                    console.dir(obj);
                    if (obj[0]) {
                        res.send(true);
                    }
                })
                .catch(next);
        }else {
            res.send("非法操作，已被记录在案！");
        }
    });
};
