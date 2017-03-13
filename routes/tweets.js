/**
 * Created by jonlazarini on 08/03/17.
 */
const router = require('express').Router();
import url from 'url';
import { readFileSync } from 'jsonfile';

import request from '../twitterService';
// import { GetTweets } from '../src/twitterAPI';


const manifestPath = `${process.cwd()}/public/build-manifest.json`;
const manifest = readFileSync(manifestPath);


const jsBundle = manifest['bundle.js'];
const cssBundle = manifest['style.css'];
const vendorBundle = manifest['vendors.js'];


router.get('/', (req, res, next) => {

  // get Twitter token
  const BEARER_TOKEN = req.app.get('BEARER_TOKEN');
  const baseUrl = 'https://api.twitter.com';
  const endPoint = '/1.1/search/tweets.json';

  if (req.query.q) {

    // we only want the query string not parsed nor in object format - req.query
    const qs = url.format(req.url).replace('/', '');

    // object storing XHR properties - XHR created on Promise request
    const twitterHeaders = {
      /* eslint-disable */
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      // 'Access-Control-Allow-Origin': '*',
    };

    const reqTwitter = {
      method: 'GET',
      // https://api.twitter.com/1.1/search/tweets.json?<qsparams>
      url: `${baseUrl}${endPoint}${qs}`,
      headers: twitterHeaders,
      // mode: 'cors',
      // cache: 'default',
      // body: `${qs}`,
    };

    return request(reqTwitter)
      .then(data => {
        console.log(`data resolved:\n${data}\n`);
        res.render('tweets', {data, jsBundle, cssBundle, vendorBundle});
      })
      .catch(error => {
        console.log(`eh zebi, err: ${error}`);
        // res.render('error', { error } );
        // renders twitter 404 page
        res.send(error);
    })
  }

  res.render('tweets', { jsBundle, cssBundle, vendorBundle });

});


module.exports = router;
