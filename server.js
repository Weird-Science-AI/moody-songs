'use strict';


// ============== Packages ==============================
const brain = require('./copiedBrain.js');
const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const path = require('path');
const DATABASE_URL = process.env.DATABASE_URL;
const pg = require('pg');
const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.log(error));
const app = express();
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
const net = new brain.NeuralNetwork();
let trainedNet ;
let longest ;
const positiveWords = ['amazing', 'awesome', 'angelic', 'brilliant', 'beautiful', 'cheery', 'cool', 'delightful', 'energetic', 'excellent', 'ecstatic', 'exciting', 'exquisite', 'fabulous', 'fantastic', 'good', 'great', 'heavenly', 'joy', 'lively', 'marvelous', 'nice', 'pleasant', 'positive', 'super', 'superb', 'terrific', 'upbeat', 'vibrant', 'wonderful', 'wholesome'];
const negativeWords = ['abysmal', 'angry', 'atrocious', 'bad', 'boring', 'cold-hearted', 'dismal', 'dreadful', 'dreary', 'evil', 'foul', 'filthy', 'grim', 'hostile', 'hurt', 'horrible', 'mean', 'negative', 'oppressive', 'sad', 'scary', 'terrible', 'unhappy', ];

app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', homeGet);
app.post('/robotPost', robotPost);
app.post('/spotifyPlaylistResults', getSpotifyPlaylistResults);
app.get('/aboutUs', getAboutUs);

// ============== Routes ================================
function homeGet(req, res){
  res.render('pages/index.ejs');
}
function robotPost(req, res){
  const robotPrediction = robotPredict(req.body.emotion);
  let forForm ;
  if (robotPrediction.robotNumbers.positive > .5){
    forForm = 'positive';
  }else {
    forForm = 'negative';
  }
  res.render('pages/zachRobot.ejs', {emotion: `${req.body.emotion}`, robotPrediction: robotPrediction.sentence, formValue: forForm});
}


// ============== Spotify ================================
passport.serializeUser(function (user, done) { done(null, user); });
passport.deserializeUser(function (obj, done) { done(null, obj); });


passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: redirect_uri + authCallbackPath,

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
      console.log(data.body.items[0].images);
      data.body.items.forEach(item => {
        const sqlQueryString = 'INSERT INTO spotifytable (playlist, client_id, client_secret, token, refresh_token, name_of_playlist, playlist_image_urls) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING;';
        const sqlQueryArray = [item.id, client_id, client_secret, token, refresh_token, item.name.toLowerCase(), item.images];
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
function getSpotifyPlaylistResults(req, res){
  const robotEmotion = req.body.emotionFromRobot;
  const sqlString = `SELECT playlist, playlist_image_urls, name_of_playlist FROM spotifytable;`;
  client.query(sqlString).then(playlistData => {
    let positivePlaylists = [];
    let negativePlaylists = [];
    let playlistIDsForEjs = '';
    playlistData.rows.forEach(playlist => {
      if (robotEmotion === 'positive') {
        positiveWords.forEach(word => {
          if (playlist.name_of_playlist.includes(word)) {
            positivePlaylists.push(playlist);
          }
        });
      } else if (robotEmotion === 'negative') {
        negativeWords.forEach(word => {
          if (playlist.name_of_playlist.includes(word)){
            negativePlaylists.push(playlist);
          }
        });
      }
    });
    if (robotEmotion === 'positive'){
      console.log('got into positive if');
      playlistIDsForEjs = generateRandomPlaylists(positivePlaylists);
    } else if(robotEmotion === 'negative'){
      console.log('got into negative if');
      playlistIDsForEjs = generateRandomPlaylists(negativePlaylists);
    }
    
    
    res.render('pages/playlists.ejs', {emotions: req.body.emotionFromRobot, playlists: playlistIDsForEjs});
  });
}
function generateRandomPlaylists(typeOfPlaylist){
  let p1 = typeOfPlaylist[Math.floor(Math.random() * typeOfPlaylist.length)].playlist;
  let p2 = typeOfPlaylist[Math.floor(Math.random() * typeOfPlaylist.length)].playlist;
  let p3 = typeOfPlaylist[Math.floor(Math.random() * typeOfPlaylist.length)].playlist;
  while (p1 === p2 || p1 === p3 || p2 === p3){
    p1 = typeOfPlaylist[Math.floor(Math.random() * typeOfPlaylist.length)].playlist;
    p2 = typeOfPlaylist[Math.floor(Math.random() * typeOfPlaylist.length)].playlist;
    p3 = typeOfPlaylist[Math.floor(Math.random() * typeOfPlaylist.length)].playlist;
  }
  return [p1, p2, p3];
}
// robot stuff goes below this line------------------------------------------
function train(data){
  net.train(processTrainingData(data), {
    log: false,
    learningRate: 0.03,
    iterations: 10000
  });
  trainedNet = net.toFunction();
}
function encode(str){
  return str.split('').map(x => (x.charCodeAt(0) / 400));
}
function processTrainingData(data){
  const processedValues = data.map(d => {
    return {
      input: encode(d.input),
      output: d.output
    }
  });
  console.log(processedValues);
  return processedValues;
}
function getTrainingData(){
  longest = trainingData.reduce((a, b) =>
    a.input.length > b.input.length ? a : b).input.length;
  for (let i = 0; i < trainingData.length; i++) {
    trainingData[i].input = adjustSize(trainingData[i].input);
  }
  return trainingData;
}
function adjustSize(string) {
  while (string.length < longest) {
    string += ' ';
  }
  return string; 
}
function predictEmotion(string){
  return trainedNet(encode(adjustSize(string)));
}
function robotPredict(emotion){
  let fromRobot = predictEmotion(emotion);
  return {sentence: `You are feeling positive: ${fromRobot.positive}%, you are feeling negative: ${fromRobot.negative}%.`, robotNumbers: fromRobot};
}
function trainNetwork(){
  train(getTrainingData());
}
const trainingData = [
    {input: 'today was a great day', output: {positive: 1}},
    {input: 'today was pretty great', output: {positive: 1}},
    {input: 'today was a great day', output: {positive: 1}},
    {input: 'i had a nice day today', output: {positive: 1}},
    {input: 'today was fantastic', output: {positive: 1}},
    {input: 'today was great', output: {positive: 1}},
    {input: 'today i was so happy', output: {positive: 1}},
    {input: 'today i got a raise', output: {positive: 1}},
    {input: 'today i got everything done early', output: {positive: 1}},
    {input: 'today i went on a date', output: {positive: 1}},
    {input: 'my day was fantastic', output: {positive: 1}},
    {input: 'my day was the best day', output: {positive: 1}},
    {input: 'today i helped an old lady cross the road', output: {positive: 1}},
    {input: 'my day was pretty good', output: {positive: 1}},
    {input: 'my day was pretty decent', output: {positive: 1}},
    {input: 'my day was pretty positive', output: {positive: 1}},
    {input: 'my day was positive', output: {positive: 1}},
    {input: 'my day was great', output: {positive: 1}},
    {input: 'my day was incredible', output: {positive: 1}},
    {input: 'it was great', output: {positive: 1}},
    {input: 'it was fantastic', output: {positive: 1}},
    {input: 'it as amazing', output: {positive: 1}},
    {input: 'it was decent', output: {positive: 1}},
    {input: 'it was the greatest', output: {positive: 1}},
    {input: 'good', output: {positive: 1}},
    {input: 'decent', output: {positive: 1}},
    {input: 'pretty good', output: {positive: 1}},
    {input: 'great', output: {positive: 1}},
    {input: 'amazing', output: {positive: 1}},
    {input: 'quite fantastic', output: {positive: 1}},
    {input: 'fantastic', output: {positive: 1}},
    {input: 'superb', output: {positive: 1}},
    {input: 'it was good', output: {positive: 1}},
    {input: 'today was a good day, didnt have to use my ak', output: {positive: 1}},
    {input: 'good day', output: {positive: 1}},
    
    {input: 'absolutely', output: {positive: 1}},
    {input: 'beautiful', output: {positive: 1}},
    {input: 'cheery', output: {positive: 1}},
    {input: 'delightful', output: {positive: 1}},
    {input: 'excellent', output: {positive: 1}},
    {input: 'fabulous', output: {positive: 1}},
    {input: 'gorgeous', output: {positive: 1}},
    {input: 'heavenly', output: {positive: 1}},
    {input: 'ideal', output: {positive: 1}},
    {input: 'jovial', output: {positive: 1}},
    {input: 'kind', output: {positive: 1}},
    {input: 'lovely', output: {positive: 1}},
    {input: 'marvelous', output: {positive: 1}},
    {input: 'nice', output: {positive: 1}},
    {input: 'optimistic', output: {positive: 1}},
    {input: 'perfect', output: {positive: 1}},
    {input: 'quality', output: {positive: 1}},
    {input: 'remarkable', output: {positive: 1}},
    {input: 'superb', output: {positive: 1}},
    {input: 'terrific', output: {positive: 1}},
    {input: 'unreal', output: {positive: 1}},
    {input: 'vibrant', output: {positive: 1}},
    {input: 'wondrous', output: {positive: 1}},
    {input: 'yes', output: {positive: 1}},
    {input: 'zeal', output: {positive: 1}},
    {input: 'pineapple', output: {positive: 1}},
    {input: 'pineapples', output: {positive: 1}},
    // {input: '', output: {positive: 1}},

    


    {input: 'today sucked', output: {negative: 1}},
    {input: 'today was pretty lame', output: {negative: 1}},
    {input: 'i needed a boost today', output: {negative: 1}},
    {input: 'my day was bad', output: {negative: 1}},
    {input: 'it as a bad day', output: {negative: 1}},
    {input: 'it was a really bad day', output: {negative: 1}},
    {input: 'it was a terribly bad day', output: {negative: 1}},
    {input: 'it was a horrible day', output: {negative: 1}},
    {input: 'my day was a long one', output: {negative: 1}},
    {input: 'my day was boring', output: {negative: 1}},
    {input: 'my day was lame', output: {negative: 1}},
    {input: 'my day was underwhelming', output: {negative: 1}},
    {input: 'my day was less than ideal', output: {negative: 1}},
    {input: 'my day sucked', output: {negative: 1}},
    {input: 'today was super boring', output: {negative: 1}},
    {input: 'today was a shitty day', output: {negative: 1}},
    {input: 'i had a shitty day today', output: {negative: 1}},
    {input: 'i stepped in dog poop', output: {negative: 1}},
    {input: 'my wife left me', output: {negative: 1}},
    {input: 'i lost all my money', output: {negative: 1}},
    {input: 'i was depressed today', output: {negative: 1}},
    {input: 'i felt depressed today', output: {negative: 1}},
    {input: 'depressing', output: {negative: 1}},
    {input: 'i was very sad today', output: {negative: 1}},
    {input: 'i was very tired today', output: {negative: 1}},
    {input: 'today went on forever', output: {negative: 1}},
    {input: 'today drug on', output: {negative: 1}},
    {input: 'today was a drag', output: {negative: 1}},
    {input: 'my day sucked', output: {negative: 1}},
    {input: 'today was so boring', output: {negative: 1}},
    {input: 'today was boring', output: {negative: 1}},
    {input: 'bad', output: {negative: 1}},
    {input: 'terrible', output: {negative: 1}},
    {input: 'horrendous', output: {negative: 1}},
    {input: 'really bad', output: {negative: 1}},
    {input: 'not good', output: {negative: 1}},
    {input: 'pretty bad', output: {negative: 1}},
    {input: 'not great', output: {negative: 1}},
    {input: 'not amazing', output: {negative: 1}},
    {input: 'not good at all', output: {negative: 1}},
    {input: 'bad day', output: {negative: 1}},
    
    {input: 'awful', output: {negative: 1}},
    {input: 'boring', output: {negative: 1}},
    {input: 'cry', output: {negative: 1}},
    {input: 'dreadful', output: {negative: 1}},
    {input: 'evil', output: {negative: 1}},
    {input: 'foul', output: {negative: 1}},
    {input: 'ghastly', output: {negative: 1}},
    {input: 'horrible', output: {negative: 1}},
    {input: 'imperfect', output: {negative: 1}},
    {input: 'junky', output: {negative: 1}},
    {input: 'lousy', output: {negative: 1}},
    {input: 'misshapen', output: {negative: 1}},
    {input: 'negative', output: {negative: 1}},
    {input: 'offensive', output: {negative: 1}},
    {input: 'poor', output: {negative: 1}},
    {input: 'questionable', output: {negative: 1}},
    {input: 'revolting', output: {negative: 1}},
    {input: 'stressful', output: {negative: 1}},
    {input: 'terrible', output: {negative: 1}},
    {input: 'unpleasant', output: {negative: 1}},
    {input: 'vile', output: {negative: 1}},
    {input: 'worthless', output: {negative: 1}},
    {input: 'yucky', output: {negative: 1}},
    // {input: '', output: {negative: 1}},
];
trainNetwork();

client.connect().then(() => {
  app.listen(PORT, () => console.log(`up on http://localhost:${PORT}`));
});
