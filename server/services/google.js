const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const config = require('config');
const github_keys = config.get('github');
const google_url = 'https://www.googleapis.com/oauth2/v4/token';


function getAccessToken(body) {

  return request.postAsync({ 
    url: github_url, 
    headers: {
      Accept: 'application/json'
    },
    form : {
      client_id: google.client_id,
      client_secret: google.client_secret,
      redirect_uri: google.redirect_uri,
      code: body.code,
      grant_type: 'authorization_code',
    }
  }).then((response) => {
    return JSON.parse(response.body);
  });
}

module.exports = getAccessToken;