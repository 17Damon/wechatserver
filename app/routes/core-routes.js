var ReactDOMServer  = require('react-dom/server'),
    React = require('react'),
    ReactApp = React.createFactory(require('../components/ReactApp'));

module.exports = function (app) {

    app.get('/test2', function (req, res) {
        // React.renderToString takes your component
        // and generates the markup
        var reactHtml = ReactDOMServer .renderToString(ReactApp({}));
        // Output html rendered by react
        console.log(reactHtml);
        res.render('index.ejs', {reactOutput: reactHtml});
    });

};
