const Course = require('../models/Course');
const db = require('../../utils/db');
const { render } = require('node-sass');

class SiteController {
    // [GET] /
    index(req, res) {
        res.render('guest/home', { currentPage: 'home' });
    }

    //[GET] /about
    about(req, res) {
        res.render('guest/about', { currentPage: 'about' });
    }

    //[GET] /faq
    faq(req, res) {
        res.render('guest/faq', { currentPage: 'faq' });
    }

    //[GET] /login
    login(req, res) {
        const error = req.query.error;
        res.render('guest/login', { currentPage: 'login', error });
    }

    //[GET] /register
    register(req, res) {
        res.render('guest/register', { currentPage: 'register' });
    }
}

module.exports = new SiteController();
