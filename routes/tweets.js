/**
 * Created by jonlazarini on 08/03/17.
 */
const router = require('express').Router();
import url from 'url';
import { readFileSync } from 'jsonfile';

import requestService from '../twitterService';
import { mentions } from '../services/twitter'


router.get('/', (req, res, next) => {

  const mode = process.env.NODE_ENV

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

    return requestService(reqTwitter)
      .then( data => {
        // parse data
        var tweets = JSON.parse(data)
        // parses txt data from twitter and getting its statuses array
        var tweetList = tweets.statuses

        // gets q qs param to be passed in the proxy to construct the url
        var Q_PARAMS = req.query.q
        res.app.set('Q_PARAMS', Q_PARAMS)

        // gets the last tweet id to pass it in the max_id qs for load more - client side
        var TWEET_CURSOR = tweets.statuses[tweets.statuses.length-1].id_str
        res.app.set('TWEET_CURSOR', TWEET_CURSOR)

        if (mode === 'production') {
          const manifestPath = `${process.cwd()}/public/build-manifest.json`;
          const manifest = readFileSync(manifestPath);
          const jsBundle = manifest['bundle.js'];
          const cssBundle = manifest['style.css'];
          const vendorBundle = manifest['vendors.js'];

          res.render('tweets', {env: mode, jsBundle, cssBundle, vendorBundle, tweetList})
        }
        else {
          var assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName

          res.render('tweets', { assetsByChunkName, tweetList })

        }
      })
      .catch(error => {
        console.log(error)
        res.render('error', {error})
      });

    // route without params
  } else {
      if (mode === 'production') {
        const manifestPath = `${process.cwd()}/public/build-manifest.json`;
        const manifest = readFileSync(manifestPath);
        const jsBundle = manifest['bundle.js'];
        const cssBundle = manifest['style.css'];
        const vendorBundle = manifest['vendors.js'];
        res.render('tweets', {env: mode, jsBundle, cssBundle, vendorBundle})
      } else {
        var assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName
        res.render('tweets', {assetsByChunkName});
      }
  }

});

// proxy for client side
router.get('/proxy', mentions)


module.exports = router;
