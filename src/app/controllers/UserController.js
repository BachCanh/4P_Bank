// app/controllers/UserController.js
const db = require('../../utils/db');

class UserController {
    // [GET] /user
    async user(req, res) {
        if (req.session.isAuthenticated) {
            // User is logged in, render the user page
            res.render('members/user');
        } else {
            // User is not logged in, redirect to login
            res.redirect('/login');
        }
    }

    // [POST] /user (login)
    async login(req, res) {
        const { email, password } = req.body;
        console.log('Go to Login success!');

        try {
            if (!email || !password) {
                return res
                    .status(400)
                    .redirect('/login?error=Email and password are required.');
            }

            const user = await db('Account_Login')
                .join(
                    'Customer',
                    'Account_Login.Customer_ID',
                    'Customer.Customer_ID',
                )
                .where({
                    'Customer.Email': email,
                    'Account_Login.Password': password,
                })
                .select('Account_Login.*', 'Customer.Name')
                .first();

            if (user) {
                // Login success, set session data
                console.log('Login Successfully!');
                req.session.isAuthenticated = true;
                req.session.user = user; // Save user details if needed
                return res.redirect('/user');
            } else {
                // Invalid credentials
                return res
                    .status(401)
                    .redirect('/login?error=Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            return res
                .status(500)
                .redirect('/login?error=Internal server error');
        }
    }

    // [GET] /user/logout (logout)
    logout(req, res) {
        // Clear authentication session data
        req.session.isAuthenticated = false;
        req.session.user = null; // Clear user data if stored

        // Redirect to login page
        res.redirect('/login');
    }
}

module.exports = new UserController();
