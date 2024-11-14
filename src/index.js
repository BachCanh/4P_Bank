// index.js (app.js)

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const session = require('express-session');
const numeral = require('numeral');

const app = express();
const port = 3000;

const route = require('./routes');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(
    session({
        secret: 'session', // Replace with your own secret key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true if using HTTPS
    }),
);

// Set isAuthenticated for templates
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isAuthenticated;
    next();
});

// Template engine setup
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            format_number(value) {
                return numeral(value).format('0,0') + ' VND';
            },
            eq: (a, b) => a === b, // Register 'eq' helper directly here
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Initialize routes
route(app);

// Start server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
