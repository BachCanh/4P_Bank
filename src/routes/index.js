// ./routes/index.js

const userRouter = require('./user');
const newsRouter = require('./news');
const siteRouter = require('./site');
const isAuthen = require('../middleware/auth'); // Import isAuthen middleware

function route(app) {
    app.use('/news', newsRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
