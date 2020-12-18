  //for searchTypeForm w/click browseBtn
//vars radiox3: film, tv, game
document.getElementById('browseBtn').addEventListener('click', searchType);
//for searchTypeForm w/click browseBtn
//vars radiox3: film, tv, game
function searchType(){
    let typeReq = "";
    let typeRadioVal = "";
    const typeChoice = document.getElementById('typeInput');
    for (i = 0; i < typeChoice.length; i++){
        if (typeChoice[i].checked) {
            typeRadioVal = toString(typeChoice[i].name);
            console.log("Bubbles Bubbles Bubbles" + typeRadioVal);
    }}
    switch(typeRadioVal) {
        case 'film': 
            typeReq = `SELECT * FROM media_table WHERE media_type = 'film' ORDER BY title_name ASC`;
        break;
        case 'tv': 
            typeReq = `SELECT * FROM media_table WHERE media_type = 'tv' ORDER BY title_name ASC`;
        break;
        case 'game': 
            typeReq = `SELECT * FROM media_table WHERE media_type = 'game' ORDER BY title_name ASC`;
        break;
        default: 
            typeReq = `SELECT * FROM media_table ORDER BY media_type ASC`;
        }
    $.ajax({
        type:"POST",
        data: {type: typeReq},
        url: "/searchType",
        dataType: "text", 
        success: "/searchTypeSuccess", 
        error: function() {
            alert("Please Try Again");
        },
    });
}

document.getElementById('genreBtn').addEventListener('click', searchGenre);
//for searchGenreForm w/click genreBtn
//vars radiox10: 1-10, vals: action, science fiction, fantasy, comedy, romance, western, anime, animation, drama, game
function searchGenre() {
    let genreReq = "";
    let genreRadioVal = "";
    const genreChoice = document.getElementById('genreInput');
    for (i = 0; i < genreChoice.length; i++){
        if (genreChoice[i].checked) {
            genreRadioVal = toString(genreChoice[i].name);
            console.log("Bubbles Bubbles Bubbles" + genreRadioVal);
    }}
    switch(genreRadioVal) {
        case 'Action': 
            genreReq = `SELECT * FROM media_table WHERE genre_type = 'Action'`;
            break;
        case 'Science Fiction': 
            genreReq = `SELECT * FROM media_table WHERE genre_type = 'Science Fiction'`;
            break;
        case 'Fantasy':  
            genreReq = `SELECT * FROM media_table WHERE genre_type = 'Fantasy'`;
            break;
        case 'Comedy': 
            genreReq = `SELECT * FROM media_table WHERE genre_type = 'Comedy'`;
            break;
        case 'Romance': 
            genreReq = `SELECT * FROM media_table WHERE genre_type = 'Romance'`;
            break;
        case 'Western':
            genreReq = `SELECT * FROM media_table WHERE genre_type = 'Western'`; 
            break;
        case 'Anime':
            genreReq = `SELECT * FROM media_table WHERE genre_type = 'Anime'`; 
            break;
        case 'Animation': 
            genreReq = `SELECT * FROM media_table WHERE genre_type = 'Animation'`;
            break;
        case 'Drama':
            genreReq = `SELECT * FROM media_table WHERE genre_type = 'Drama'`; 
            break;
        case 'Game':
            genreReq = `SELECT * FROM media_table WHERE genre_type = 'Game'`;
        default:
            genreReq = `SELECT * FROM media_table ORDER BY genre_type`; 
            break;
        };
    $.ajax({
        type:"POST",
        data: {genre: genreReq},
        url: "/searchGenre",
        dataType: "text", 
        success: "/searchGenreSuccess",
        error: function() {
        alert("Please Try Again");
        },
    });
}

// document.getElementById('addInfoMedia').addEventListener('click', addProcess);
// //for add page addInfoForm w/click addInfoMedia (temp btn)
// //vars media_title
// function addProcess() {

// // }
//below is imdb api code if I can get it inserted
// const request = require('request');

// const options = {
//   method: 'GET',
//   url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
//   qs: {s: 'Avengers Endgame', page: '1', r: 'json'},
//   headers: {
//     'x-rapidapi-key': 'e3a2dd1811mshfaa5402ffaa8014p12ff5ajsn2b3b415ab9d9',
//     'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
//     useQueryString: true
//   }
// };

// request(options, function (error, response, body) {
// 	if (error) throw new Error(error);

// 	console.log(body);
// });