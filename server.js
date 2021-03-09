'use strict'

// ============== Packages ==============================
const express = require('express');
const superagent = require('superagent');
require('dotenv').config();
// const pg = require('pg');
// const methodOverride = require('method-override');
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport')














// ============== App ===================================
const app = express();
// const DATABASE_URL = process.env.DATABASE_URL;
// const client = new pg.Client(DATABASE_URL);
const PORT = process.env.PORT || 3111;
const API_ID = process.env.API_ID;
const API_KEY = process.env.API_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
// app.use(methodOverride('_method'));



// ============== Routes ================================
passport.use(
  new SpotifyStrategy(
    {
      clientID: API_ID,
      clientSecret: API_KEY,
      callbackURL: 'http://localhost:8888/auth/spotify/callback',
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
    console.log("🚀 ~ file: server.js ~ line 49 ~ profile", profile)
    //   User.findOrCreate({spotifyId: profile.id}, function (err, user) {
    //     return done(err, user);
    //   });
    }
  )
);

app.get('/', getHomepage);







// Homepage
  function getHomepage (req, res) {
    // const url = `URL LINK`;
    // superagent.get(url)
    // .then(results => {
    //     // const playlist = results.body."something here".map(music => new Music(music))
    //     console.log("🚀 ~ file: server.js ~ line 61 ~ getHomepage ~ playlist", playlist)
        
            res.render('pages/index.ejs')
        // })
  }



// Scope Solution 
app.get(
    '/auth/spotify',
    passport.authenticate('spotify', {
      scope: ['user-read-email', 'user-read-private'],
    })
  );


// Configure Strategy
app.get('/auth/spotify', passport.authenticate('spotify'));

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', {failureRedirect: '/login'}),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);








//   // Music Constructor 
//   function Music (object) {
//     this.playlist_name = 'playlist';
//   }


// ============== Initialization ========================
// client.connect().then(() => {
app.listen(PORT, () => console.log((`up on http://localhost:${PORT}`)));
// });

