const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const path = require('path');
const db = require('./db');
const request = require('request');

const app = express();
//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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

app.set('views', path.join(__dirname, '/views'));
app.set(express.static(path.join(__dirname, '/public')));
app.set(express.static(path.join(__dirname, '/')));
app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.engine('text/html', require('ejs').renderFile);
app.use(express.static(__dirname));
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
// Define routes
app.get('/', function(req, res) {
  res.render('pages/index.ejs');
});
app.get('/browse', 
   function(req, res){
     res.render('pages/browse.ejs');
   });
app.post('/browse', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.render('pages/browse.ejs');
});
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });
app.get('/add', 
function(req, res) {
  res.render('pages/add.ejs');
});
app.get('/addMedia', 
    async function(req, res) {
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM media_table WHERE title_name = 'Iron Man'`);
            const results = { 'result': (result) ? result.rows: null};
            if (results) {
                res.render('pages/search.ejs', results);
            }
        } catch (err) {
            console.error(err);
            res.send("Error (addError) " + err);
        }
    })
app.get('/searchAll', 
async function(req, res) {
    try {   
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM media_table');
        const results = { 'result': (result) ? result.rows: null};
        if (results) {
            res.render('pages/genre.ejs', results);
            }
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error (allError) " + err);
    }
})
app.get('/searchType',
async function(req, res) {
    try {   
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM media_table WHERE media_type = 'film'`);
        const results = { 'result': (result) ? result.rows: null};
        if (results) {
            res.render('pages/type.ejs', results);
            }
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error (typeError) " + err);
    }
})
app.get('/searchGenre', 
async function(req, res) {
    try {   
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM media_table WHERE genre_type = 'Action'`);
        const results = { 'result': (result) ? result.rows: null};
        if (results) {
        res.render('pages/genre.ejs', results);
        }
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error (genreError) " + err);
    }
}) 
app.get('/rapidAPI', 
  async function(req, res) {
    try{
      request.get(req.body.url + req.body.qs + "&maxResults=36&OrderBy=relevance", {json: true}, (error, data) => {
        if (error) {
          return console.log(err);
          throw(error);}
          res.type('json');
          res.json(data.body)
        })
    } catch(err) {
      console.error(err);
      res.send("Error (googleError)" + err);
    }
  });
// const options = {
//    method: 'GET',
//    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
//    qs: {s: 'Avengers Endgame', page: '1', r: 'json'},
//    headers: {
//      'x-rapidapi-key': 'e3a2dd1811mshfaa5402ffaa8014p12ff5ajsn2b3b415ab9d9',
//      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
//      useQueryString: true
//    }
//  };

 request(options, function (error, response, body) {
 	if (error) throw new Error(error);

 	console.log(body);
 });
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