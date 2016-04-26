const express = require('express');
const app = express();
const githubService = require('./server/services/github');
const googleService = require('./server/services/google');

app.set('view engine', 'ejs');

app.get('/github', githubService);

app.get('/google', googleService);

app.listen(process.env.PORT || 1337);
