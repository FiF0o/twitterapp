/**
 * Created by jonlazarini on 08/03/17.
 */
const router = require('express').Router();
import { readFileSync } from 'jsonfile';

import request from '../twitterService';


const manifestPath = `${process.cwd()}/public/build-manifest.json`;
const manifest = readFileSync(manifestPath);


const jsBundle = manifest['bundle.js'];
const cssBundle = manifest['style.css'];
const vendorBundle = manifest['vendors.js'];


router.get('/tweets', (req, res, next) => {

  // get Twitter token
  const BEARER_TOKEN = req.app.get('BEARER_TOKEN')


  const baseUrl = 'https://api.twitter.com';
  const endPoint = '/1.1/search/tweets.json';
  const qs = req.query;

  const twitterHeaders = {
    /* eslint-disable */
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  };

  const reqTwitter = {
    method: 'GET',
    url: `${baseUrl}${endPoint}?${qs}`,
    headers: twitterHeaders,
    // mode: 'cors',
    // cache: 'default',
    // body: `${qs}`,
  };

  console.log('xhr obj:\n', reqTwitter);

  // return request(reqTwitter)
  //   .then( data => {
  //     console.log(data)
  //     res.render('template', )
  //   })
  //   .catch(error => console.log(error));

  const data = {
    foo: 'bar',
    bat: 'baz'
  };
  res.render('tweets', { data, jsBundle, cssBundle, vendorBundle });
});


module.exports = router;
