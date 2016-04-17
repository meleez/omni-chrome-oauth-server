const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const config = require('config');
const googleKeys = config.get('github');
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

module.exports = getAccessToken;
