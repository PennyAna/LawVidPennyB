const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const path = require('path');
const db = require('./db');
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use('local',
  new Strategy( {
    usernameField: 'name', 
    passwordField: 'password'
  },
  function(name, password, cb) {
    db.users.findByName(name, 
      function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });}));
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
// Create a new Express application.
const app = express();
app.set(express.static(path.join(__dirname, '/views')));
app.set(express.static(path.join(__dirname, '/public')));
app.set(express.static(path.join(__dirname, '/')));
app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
// Define routes.
app.get('/',
  function(req, res) {
    res.render('home.ejs', { user: req.user });
    console.log('homeget');
  });
app.get('/login',
  function(req, res){
    res.render('login.ejs');
    console.log('loginget');
  });
  app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
    console.log('loginpost');
  });
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
    console.log('logoutget');
  });
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile.ejs', { user: req.user });
    console.log('profileget');
  });
  app.get('/main', async function(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM media_table');
        const results = { 'results': (result) ? result.rows: null};
        res.render('main.ejs', results);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})
const {Pool} = require('pg');
const pool = new Pool({
connectionString: process.env.DATABASE_URL, 
ssl: {
  rejectUnauthorized: false
} 
});
app.listen(app.get('port'), function() {
console.log('Now listening for connections on port: ', app.get('port'));
});