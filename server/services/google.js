const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const config = require('config');
const googleKeys = config.get('google');
const googleUrl = 'https://www.googleapis.com/oauth2/v4/token';

function getAccessToken(body) {
  return request.postAsync({
    url: googleUrl,
    headers: {
      Accept: 'application/json',
    },
    form: {
      client_id: googleKeys.client_id,
      client_secret: googleKeys.client_secret,
      redirect_uri: googleKeys.redirect_uri,
      code: body.code,
      grant_type: 'authorization_code',
    },
  }).then((response) => JSON.parse(response.body));
}

function googleService(req, res) {
  getAccessToken(req.query)
    .then((body) => {
      res.render('index', { 
        access_token: body.access_token, 
        type: 'google', 
        extension_id: config.get('extensionID'),
      });
    });
}

module.exports = googleService;
