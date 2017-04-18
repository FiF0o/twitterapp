/**
 * Created by jonlazarini on 07/03/17.
 */
var Express  = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var webpack = require('webpack')
var webpackHotMiddleware = require('webpack-hot-middleware')
var webpackMiddleware = require('webpack-dev-middleware')
var configWebpack = require('./webpack.config')

var twitterAPI = require('./src/twitterAPI');
var token = require('./config/token');


/** routes **/
var routes = require('./routes/index');
var home = require('./routes/home');
var tweets = require('./routes/tweets');


/** MW **/
var logErrors = require('./utils/logErrors');
var notFound = require('./utils/notFound');
var errorHandler = require('./utils/errorHandler');

/** Globals **/
// access_token (bearer token type) for future API requests;
var BEARER_TOKEN;
var isProd = process.env.NODE_ENV


var app = Express();
// app.set('trust proxy', 1) // trust first proxy - no https yet...
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.set('views', path.join(__dirname, 'src/views/'));
app.set('view engine', 'pug');
app.use(Express.static(path.join(__dirname, 'public/')));

if(!isProd) {
  var compiler = webpack(configWebpack)
  var webpackBuffer = webpackMiddleware(compiler, {
    publicPath: configWebpack.output.publicPath,
    contentBase: 'src/',
    serverSideRender: true,
    // dashboard
    stats: {}
  });
  app.use(webpackBuffer);
  app.use(webpackHotMiddleware(compiler));
}

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
const encodedToken = Buffer.from(`${token.consumerToken}:${token.consumerTokenSecret}`).toString('base64'); // base64 app token encoding as btoa (browser api) is not supported - needed to the server to consume
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
    // makes token available in the entire app
    app.set('BEARER_TOKEN', BEARER_TOKEN);
    return BEARER_TOKEN;
  })
  .catch((error) => {
    console.log('err:', error);
});


app.use('/', home);
app.use('/tweets', tweets);


// error handling
app.use(logErrors);
app.use(notFound);
app.use(errorHandler);


module.exports = app;
