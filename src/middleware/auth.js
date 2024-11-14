// ./middleware/auth.js

function isAuthen(req, res, next) {
    if (req.session.isAuthenticated) {
        return next(); // Proceed if authenticated
    }
    // Redirect to login if not authenticated
    return res.redirect('/login');
}

module.exports = isAuthen;
