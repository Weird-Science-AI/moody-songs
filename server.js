'use strict';


// ============== Packages ==============================
const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const path = require('path');
const DATABASE_URL = process.env.DATABASE_URL;
const pg = require('pg');
const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.log(error));
const app = express();
// const cors = require("cors")
// const client = require('./client');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const session = require('express-session');
const { request } = require('http');

// ============== App ===================================
const PORT = process.env.PORT;
const client_id = process.env.CLIENT_ID; // Spotify client id
const client_secret = process.env.CLIENT_SECRET; // spotify Client secret
const authCallbackPath = '/auth/spotify/callback';
const redirect_uri = process.env.REDIRECT_URI; // redirect uri

const playlists = [];

app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', homeGet);
app.post('/robotPost', robotPost);
app.get('/seeRobot', getSeeRobot);
app.post('/spotifyPlaylistResults', getSpotifyPlaylistResults);
app.get('/aboutUs', getAboutUs);

// ============== Routes ================================
function homeGet(req, res){
  // console.log(req.body);
  res.render('pages/index.ejs');
}
function robotPost(req, res){
  // const usersDay = {emotion: `${req.body.emotion}`};
  res.render('pages/zachRobot.ejs', {emotion: `${req.body.emotion}`});
}


// ============== Spotify ================================
passport.serializeUser(function (user, done) { done(null, user); });
passport.deserializeUser(function (obj, done) { done(null, obj); });


passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: redirect_uri + PORT + authCallbackPath,

    },
    // from; https://github.com/JMPerez/passport-spotify/blob/master/examples/login/app.js
    function (accessToken, refreshToken, expires_in, profile, done) {
      console.log('Problem 6');
      process.nextTick(function () {
        // To keep the example simple, the user's spotify profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the spotify account with a user record in your database,
        // and return that user instead.
        //set access and refresh tokens
        profile.accessToken = accessToken;
        console.log('🚀 ~ file: server.js ~ line 70 ~ profile.accessToken ', profile.accessToken );

        profile.expires_in = 3;

        profile.refreshToken = refreshToken;
        console.log('🚀 ~ file: server.js ~ line 73 ~ profile.refreshToken', profile.refreshToken);


        return done(null, profile);
      });
    }
  )
);


app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // ASK JAMES






//Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// ============== Spotify Routes ================================
app.get('/auth/spotify', authUserWithScopes());
app.get(authCallbackPath, checkLogin(), (req, res) => { exampleApiCall(req, res); });
app.get('/', getlanding);
app.get('/sampleUseInfo', getUserData);

// ============== Spotify Handlers ================================
function checkLogin() { // Stand Alone
  console.log('problem 1');
  return passport.authenticate('spotify', { failureRedirect: '/login' });
}

function authUserWithScopes(req, res) { // Stand Alone
  console.log('problem 2');
  return passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-top-read', 'playlist-read-private'],
    showDialog: true,
  });
}


function handelError(res) { // Stand Alone
  return err => {
    //log error
    console.log(err);
    // let user know we messed up
    res.status(500).render('error', { err: err });
  };
}

function exampleApiCall(req, res) { // Stand Alone
  const client_id = req.user.accessToken;
  const client_secret = req.user.accessToken;
  const token = req.user.accessToken;
  const refresh_token = req.user.refreshToken;
  superagent.get('https://api.spotify.com/v1/me/playlists?')
    .auth(req.user.accessToken, { type: 'bearer' })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then(data => {
      data.body.items.forEach(item => {
        const sqlQueryString = 'INSERT INTO spotifytable (playlist, client_id, client_secret, token, refresh_token) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;';
        const sqlQueryArray = [item.id, client_id, client_secret, token, refresh_token];
        client.query(sqlQueryString, sqlQueryArray);
      });
      res.redirect('/');
    });
}

function getlanding(req, res) {
  console.log('problem 4');

  res.render('pages/index.ejs', { user: req.user, title: 'Landing Page' });
}
function getUserData(req, res) {
  console.log('problem 5');

  passport.authenticate();
}
// ^^^^^^^^^^^^^^ Spotify Handlers ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



function getAboutUs(req, res){
  res.render('pages/aboutUs.ejs');
}
function getSeeRobot(req, res){
  res.render('pages/seeRobot.ejs');
}
function getSpotifyPlaylistResults(req, res){
  const sqlString = 'SELECT playlist FROM spotifytable;';
  client.query(sqlString).then(playlistData => {
    const playlistForEjs = playlistData.rows[0].playlist;
    console.log(playlistForEjs);
    res.render('pages/playlists.ejs', {emotions: req.body.emotionFromRobot, playlist: playlistForEjs});
  })
}


client.connect().then(() => {
  app.listen(PORT, () => console.log(`up on http://localhost:${PORT}`));
});
