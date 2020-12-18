const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const path = require('path');
const db = require('./db');
const { json } = require('express');
//app.post('/endpoint', function (req, res) {
//var form = new multiparty.Form();
//form.parse(req, function(err, fields, files) {
  //fields, fields fields
//});
//})
// Create a new Express application.
const app = express();
//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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
// app.get('/login',
//   function(req, res){
//     res.render('partials/login.ejs');
//   });
app.post('/login', 
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
app.get('/browse', function(req, res) {
  res.render('pages/browse.ejs');
});
// app.get('/profile', 
// require('connect-ensure-login').ensureLoggedIn(),
// function(req, res){
//   res.render('partials/profile.ejs', { user: req.user });
// });
app.post('/addMedia',   
  async function(req, res) {
    try {
      const query = `INSERT INTO media_table (title_name, genre_type, media_type) VALUES ('Frozen', 'Animation', 'film')`;
      await client.query('BEGIN');
      JSON.stringify(client.query(query, 
        function(err, result) {
          if (result.rows[0]) {
            console.log("Warning, this is already in the database");
            res.redirect('/browse');
          }
          else {
            client.query(query, function (err, result) {
              if (err) {console.log(err);}
              else{
                client.query('COMMIT');
                console.log(result);
                console.log("Success!");
                res.redirect('/add');
                return;
              }
            })}
          }));
          client.release();
    } catch (err) {
          console.error(err);
          res.send("Error " + err);
      }
      });
const browseResults = {};
app.get('/searchAll',
    async function(req, res) {
      try {
        const query = 'SELECT * FROM media_table ORDER BY title_name ASC';
        runQuery(JSON.stringify(query), 
          function(err, result) {
            if (result.rows[0]) {
              console.log("Warning, this is already in the database");
              res.redirect('/add');
            }
            else {
              runQuery(query, function (err, result) {
                if (err) {console.log(err);}
                else{
                  client.query('COMMIT');
                  console.log(result);
                   browseResults = { 
                    'result': (result) ? result.rows: null
                  };
                  console.log("Success!");
                  res.redirect('/add');
                  return;
                }
              })}});
      }catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});
const genreResults = {};
app.get('/searchGenre', 
  async function(req, res) {
  try {
    const genre = req.body.genre;
    genreResults = runQuery(JSON.stringify(genre));     
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
app.get('/searchGenreSuccess', 
  function(req, res) {
    res.render("pages/genre.ejs", genreResults);
  });

  const typeResults = {};
app.post('/searchType', 
  async function(req, res) {
  try {    
   const type = req.body.type;
   typeResults = runQuery(JSON.stringify(type));
  } catch (err) { 
    console.error(error);
    res.send("Error " + err);
  }
}); 

app.get('/searchTypeSuccess', 
  function(req, res) {
    res.render("pages/type.ejs", typeResults);
  });

const {Pool} = require('pg');
const pool = new Pool({
connectionString: process.env.DATABASE_URL, 
ssl: {
  rejectUnauthorized: false
}, 
max: 20, 
idleTimeoutMillis: 30000, connectionTimeoutMillis: 2000,
});
const client = pool.connect();
app.listen(app.get('port'), function() {
console.log('Now listening for connections on port: ', app.get('port'));
});

function runQuery (queryString, callback) {
  const results = {};
  client.query(queryString, function(err, result) {
    if(err) {
      console.error(err);
    }
    results = {
      'result': (result) ? result.rows: null
    };
    client.release(); 
  })
  return results;
}