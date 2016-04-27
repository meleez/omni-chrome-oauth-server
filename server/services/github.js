const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const config = require('config');
const githubKeys = config.get('github');
const githubUrl = 'https://github.com/login/oauth/access_token';


function getAccessToken(body) {
  return request.postAsync({
    url: githubUrl,
    headers: {
      Accept: 'application/json',
    },
    form: {
      client_id: githubKeys.client_id,
      client_secret: githubKeys.client_secret,
      code: body.code,
    },
  }).then((response) => JSON.parse(response.body));
}

function githubService(req, res) {
  getAccessToken(req.query)
    .then((body) => {
      res.render('index', { access_token: body.access_token, type: 'github', extension_id: config.get('extensionID') });
    });
}

module.exports = githubService;
