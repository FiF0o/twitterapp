/**
 * Created by jonlazarini on 07/03/17.
 */
var Express  = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var twitterAPI = require('./src/twitterAPI');
import request from './twitterService';
var token = require('./token');

/** routes **/
var routes = require('./routes/index');
import home from './routes/home';
var tweets = require('./routes/tweets');


var app = Express();
var PORT = process.env.PORT || 8889;

/** Globals **/
// access_token (bearer token type) for future API requests;
var BEARER_TOKEN;

app.set('views', path.join(__dirname, 'src/views/'));
app.set('view engine', 'pug');
app.use((req, res, next) => {
  console.log(`global MW!`);
  next();
});
app.use(Express.static(path.join(__dirname, 'public/')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/**
 * Required by twitter API encoding tokens
 * https://dev.twitter.com/oauth/application-only
 *
 * more about OAUTH2 and Twitter API: https://dev.twitter.com/oauth/reference/post/oauth2/token
 * **/

/* eslint-disable */
const encodedToken = Buffer.from(`${token.accessToken}:${token.accessTokenSecret}`).toString('base64'); // base64 app token encoding as btoa (browser api) is not supported - needed to the server to consume
// const encodedToken2 = btoa(encodeURIComponent(`${accessToken}:${accessTokenSecret}`));
const url = 'https://api.twitter.com/oauth2/token';

const httpBearerHeaders = {
  /* eslint-disable */
  'Authorization': `Basic ${encodedToken}`,
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
};

const reqBearer = {
  method: 'POST',
  url: url,
  headers: httpBearerHeaders,
  mode: 'cors',
  cache: 'default',
  // header body needed by bootstrap
  body: 'grant_type=client_credentials',
};

/** OAUTH  Get token form the Twitter API is needed before using twitter endpoints **/
twitterAPI.GetBearerToken(reqBearer)
  .then((data) => {
    const parsedResp = JSON.parse(data);
    // stores bearer token globally for future requests
    BEARER_TOKEN = parsedResp.access_token;
    return BEARER_TOKEN;
  })
  .catch((error) => {
    console.log('err:', error);
});


/** search endpoint **/
// router.get('/search', (req, res, next) => {
//   console.log(req.query);



/*  // from twitter API
  const baseUrl = 'https://api.twitter.com';
  const endPoint = '/1.1/search/tweets.json';
  const qs = req.query;
  console.log(`BR TOKEN:\n ${BEARER_TOKEN}`);
  console.log('qs:\n', qs);
  console.log(`qUrl: \n${baseUrl}${endPoint}`);

  const twitterHeaders = {
    /!* eslint-disable *!/
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  };
  console.log('twitterHeaders:\n', twitterHeaders);

  const reqTwitter = {
    method: 'GET',
    url: `${baseUrl}${endPoint}?${qs}`,
    headers: twitterHeaders,
    // mode: 'cors',
    // cache: 'default',
    // body: `${qs}`,
  };

  console.log('xhr obj:\n', reqTwitter);

  return request(reqTwitter)
    .then( data => {
      console.log(data)
      res.render('template', )
    })
    .catch(error => console.log(error));*/




  // res.render('tweets', {jsBundle, cssBundle, vendorBundle});



// });

app.use('/', home);
app.use('/search', tweets);

app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
