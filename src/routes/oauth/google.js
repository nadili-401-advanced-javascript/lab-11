'use strict';

const express = require('express');

const googleMW = require('../../middleware/oauth/google-mw.js');
const router = express.Router();

/**
 * @route GET /google
 * This route authenticates the server to ensure the request is coming from a verified google developer account. We collect the url and options from environment variables, and redirect to our /google-oauth route, which then executes the code from our googleMW module.
 * @param {object}   req   The request object
 * @param {object}   res   The response object
 * @param {Function} next  We don't use it in here, but this is our method for going to the next middleware or error middleware in the request-response chain
 * @security OAuth
 * @returns {object} 200 - An authenticated URL to send back to Google's API to retreive user info
 */

router.get('/google', (req, res, next) => {
  let googleOAuthURL = process.env.GOOGLE_AUTH_SERVICE;
  let options = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.HOME_URL + '/google-oauth',
    scope: 'email openid profile',
    prompt: 'consent',
    response_type: 'code',
  };

  // TODO: Comment
  googleOAuthURL += '?';

  // TODO: Comment
  Object.keys(options).forEach((key, indx) => {
    googleOAuthURL += key + '=' + encodeURIComponent(options[key]);
    googleOAuthURL += '&';
  });

  // TODO: Comment
  res.status(200).json({ url: googleOAuthURL });
});

// TODO: Swagger Comment
router.get('/google-oauth', async (req, res, next) => {
  let data = await googleMW(req);

  // TODO: Comment
  res.status(200).json({ name: data.name, email: data.email });

  // TODO: README Question:
  // Now that we have some data about the user, how would we go about
  // adding this user to our database?
  // What data should we save?
  // What data is missing?
  // What considerations about storing this data do we need to take?
});

module.exports = router;
