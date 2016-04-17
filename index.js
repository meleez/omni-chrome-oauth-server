const express = require('express');
const app = express();
const config = require('config');
const githubService = require('./server/services/github');

app.set('view engine', 'ejs');

app.get('/github', (req, res) => {
  githubService(req.query)
    .then((body) => {
      console.log(body.access_token);
      res.render('index', { access_token : body.access_token, type: 'github' });
    });
});

app.get('/google', (req, res) => {
  googleService(req.query)
    .then((body) => {
      res.render('index', { access_token : body.access_token, type: 'google' });
    });
});

app.listen(1337);