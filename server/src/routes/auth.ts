import { Router, Request, Response, NextFunction } from "express";
import { isAuth, isAdmin, registerUser } from "../lib/authUtils";
const passport = require('passport');

/**
* ABOUT: 
* 
* Made with route-template.md
*/

const router = Router();

/**
 * -------------- POST ROUTES ----------------
 */
const authOpts = { failureRedirect: 'login-failure', successRedirect: 'login-success'}
router.post('/login', passport.authenticate('local', authOpts), (req, res, next) => {})

router.post('/register', (req, res, next) => {
    registerUser(req, res);
    
    res.redirect('login')
})

  /**
 * -------------- GET ROUTES ----------------
 */

  router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="auth/register">register</a></p>');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Email:<br><input type="email" name="email">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="POST" action="register">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Email:<br><input type="email" name="email">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.');
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('You made it to the admin route.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout(function(err:any) {
        if (err) { return next(err); }
        res.redirect('/auth');
      });
});

router.get('/login-success', (req, res, next) => {
    console.log("LOGIN-SUCCESS!");
    res.send('<p>You successfully logged in. --> <a href="protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    console.log("LOGIN-FAILURE!");
    res.send('You entered the wrong credentials.');
});
  
  /**
 * -------------- OTHER ROUTES ----------------
 */

// Testing
router.get("/ping", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Pong" });
  });

module.exports = router;