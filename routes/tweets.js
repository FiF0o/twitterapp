/**
 * Created by jonlazarini on 08/03/17.
 */
const router = require('express').Router();
import url from 'url';
import { readFileSync } from 'jsonfile';

import request from '../twitterService';


const manifestPath = `${process.cwd()}/public/build-manifest.json`;
const manifest = readFileSync(manifestPath);


const jsBundle = manifest['bundle.js'];
const cssBundle = manifest['style.css'];
const vendorBundle = manifest['vendors.js'];


router.get('/', (req, res, next) => {

  if (req.query.q) {

    const BEARER_TOKEN = req.app.get('BEARER_TOKEN');
    const baseUrl = 'https://api.twitter.com';
    const endPoint = '/1.1/search/tweets.json';
    const qs = url.format(req.url).replace('/', '');
    const twitterHeaders = {
      /* eslint-disable */
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    const reqTwitter = {
      method: 'GET',
      // example for url format - /1.1/statuses/user_timeline.json?count=100&screen_name=twitterapi
      url: `${baseUrl}${endPoint}${qs}`,
      headers: twitterHeaders,
      // mode: 'cors',
      // cache: 'default',
      // body: `${qs}`,
    };

    return request(reqTwitter)
      .then( data => {
        // parse data
        var tweets = JSON.parse(data)
        // parses txt data from twitter and getting its statuses array
        var tweetList = tweets.statuses
        console.log('tweetList: \n', tweetList)
        res.render('tweets', { jsBundle, cssBundle, vendorBundle, tweetList })
      })
      .catch(error => {
        console.log(error)
        res.render('error', {error})
      });

  } else {
    res.render('tweets', { jsBundle, cssBundle, vendorBundle });
  }

});


module.exports = router;
