const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const config = require('config');
const github_keys = config.get('github');
const github_url = 'https://github.com/login/oauth/access_token';


function getAccessToken(body) {

  return request.postAsync({ 
    url: github_url, 
    headers: {
      Accept: 'application/json'
    },
    form : {
      client_id : github_keys.client_id,
      client_secret : github_keys.client_secret,
      code : body.code,
    }
  }).then((response) => {
    return JSON.parse(response.body);
  });
}

module.exports = getAccessToken;