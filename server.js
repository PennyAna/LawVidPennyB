const express = require('express');
const path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/')));
app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function (req, res) { res.render('pages/index.ejs');})
app.get('/postage', function (req, res) {
    res.render('pages/postage.ejs');
 
});
app.get('/db', async function(req, res) {
    try {
        const client = await pool.connect();
        const tableOne = await client.query('SELECT * FROM test_table');
        const tableTwo = await client.query('SELECT * FROM media_table');
        const tableThree = await client.query('SELECT * FROM login_table');
        const tableFour = await client.query('SELECT * FROM genre_table');
        const results = { 
            'tableOne': (tableOne) ? tableOne.rows: null,
            'tableTwo': (tableTwo) ? tableTwo.rows: null,
            'tableThree': (tableThree) ? tableThree.rows: null, 
            'tableFour': (tableFour) ? tableFour.rows: null
        };
        res.render('pages/db.ejs', results);
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