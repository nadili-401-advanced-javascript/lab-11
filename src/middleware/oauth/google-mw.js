const superagent = require('superagent');
/**
 *  sends the authorization code to Google in order to retrieve the user info
 * @param  {} process.env.GOOGLE_TOKEN_SERVICE
 * @param  {object} 
 */
let getUserData = async request => {
  // saving authorization code to a variable 
  let authCode = request.query.code;

  // POST request to Google
  let googleRes = await superagent
    .post(process.env.GOOGLE_TOKEN_SERVICE)
    .type('form')
    .send({
      code: authCode,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.HOME_URL}/google-oauth`,
      grant_type: 'authorization_code',
    });

  // saving access token code to a variable 
  let access_token = googleRes.body.access_token;

  // setting tocken into rquest header
  googleRes = await superagent
    .get(process.env.GOOGLE_API)
    .set('Authorization', `Bearer ${access_token}`);

  // saving response data into variable
  let userData = googleRes.body;
  return userData;
};

module.exports = getUserData;
