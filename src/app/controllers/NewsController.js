const { render } = require('node-sass');

class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('guest/news');
    }

    //[GET] /news/:slug
    show(req, res) {
        res.send('News Details!!!');
    }
}

module.exports = new NewsController();
