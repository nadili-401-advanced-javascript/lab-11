'use strict';

const express = require('express');

const googleMW = require('../../middleware/oauth/google-mw.js');
const router = express.Router();

/**
 * @route GET /google
 *  request /google-oauth route 
 * @param {object}   req   The request object
 * @param {object}   res   The response object
 * @security OAuth
 * @returns {object} 200 -> googleOAuthURL to send back to Google's API to retreive user info
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

  // adding '?' to googleOAuthURL (for adding query later)
  googleOAuthURL += '?';

  // combining url query parametrs
  Object.keys(options).forEach((key, indx) => {
    googleOAuthURL += key + '=' + encodeURIComponent(options[key]);
    googleOAuthURL += '&';
  });

  res.status(200).json({ url: googleOAuthURL });
});

/**
 * @route GET /google-oauth
 * @param {object}   req   The request object
 * @param {object}   res   The response object
 * @security OAuth
 * @returns {object} 200 - The name and email address from the selected Google account
 */

router.get('/google-oauth', async (req, res, next) => {
  let data = await googleMW(req);

  // send name and mail as response 
  res.status(200).json({ name: data.name, email: data.email });

});

module.exports = router;
