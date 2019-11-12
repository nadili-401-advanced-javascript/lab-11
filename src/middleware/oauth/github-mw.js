const superagent = require('superagent');

let getUserData = async request => {
  // saving authorization code to a variable 
  let authCode = request.query.code;

  // POST request to Google
  let githubRes = await superagent
    .post(process.env.GITHUB_TOKEN_SERVICE)
    .type('form')
    .send({
      code: authCode,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      redirect_uri: `${process.env.HOME_URL}/github-oauth`,
      state: process.env.GITHUB_SATE,
    });

  // saving access token code to a variable 
  let access_token = githubRes.body.access_token;

  // setting tocken into rquest header
  githubRes = await superagent
    .get(process.env.GITHUB_API)
    .set('Authorization', `Bearer ${access_token}`);

  // saving response data into variable
  let userData = githubRes.body;
  return userData;
};

module.exports = getUserData;
