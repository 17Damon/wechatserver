var ReactDOMServer  = require('react-dom/server'),
    React = require('react'),
    ReactApp = React.createFactory(require('../components/ReactApp'));

module.exports = function (app) {
    var num = Math.random();
    app.get('/test2', function (req, res) {
        // React.renderToString takes your component
        // and generates the markup
        var reactHtml = ReactDOMServer .renderToString(<ReactApp number={num}/>);
        // Output html rendered by react
        console.log(reactHtml);
        //服务器端同构渲染参数
        res.render('index.ejs', {reactOutput: reactHtml,num:num});
    });

};
