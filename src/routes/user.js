const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const isAuthen = require('../middleware/auth'); // Import isAuthen middleware

router.get('/logout', userController.logout); // Logout route
router.get('/', isAuthen, userController.user); // Protect the user page
router.post('/', userController.login); // Allow login without auth

module.exports = router;
