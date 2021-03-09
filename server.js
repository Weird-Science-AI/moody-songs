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
app.post('/robotPost', robotPost);
app.get('/seeRobot', getSeeRobot);
app.post('/spotifyPlaylistResults', getSpotifyPlaylistResults);
app.get('/popular', getFavorites);
app.get('/aboutUs', getAboutUs);

function homeGet(req, res){
  // console.log(req.body);
  res.render('pages/index.ejs');
}
function robotPost(req, res){
  // const usersDay = {emotion: `${req.body.emotion}`};
  res.render('pages/zachRobot.ejs', {emotion: `${req.body.emotion}`});
}
function getSpotifyPlaylistResults(req, res){
  // the output from the robot will be in the req.body.
  // put spotify api call here and pass the results into the res.render as the second argument


  // spotify api call^^^^^^^^^
  res.render('pages/playlists.ejs', {emotion:req.body.emotionFromRobot});
}
function getFavorites(req, res){
  // console.log(req.body);
  // right here is where the sql query for getting popular playlists goes
  // send the favorites into the render function
  res.render('pages/popular.ejs');
}
function getAboutUs(req, res){
  res.render('pages/aboutUs');
}
function getSeeRobot(req, res){
  res.render('pages/seeRobot');
}


app.listen(PORT, () => console.log(`up on http://localhost:${PORT}`));