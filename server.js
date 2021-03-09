'use strict';

const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', homeGet);
app.post('/robot', robotPost);
app.post('/spotifyPlaylistResults', getSpotifyPlaylistResults);

function homeGet(req, res){
  console.log(req);
  res.render('pages/index.ejs');
}
function robotPost(req, res){
  // const usersDay = {emotion: `${req.body.emotion}`};
  res.render('pages/zachRobot.ejs', {emotion: `${req.body.emotion}`});
}
function getSpotifyPlaylistResults(req, res){
  console.log(req.body);
  // the output from the robot will be in the req.body.
  // put spotify api call here and pass the results into the res.render as the second argument


  // spotify api call^^^^^^^^^
  res.render('pages/playlists.ejs', {emotion:req.body.emotionFromRobot});
}


app.listen(PORT, () => console.log(`up on http://localhost:${PORT}`));