/**
 * Created by jonlazarini on 07/03/17.
 */
var Express  = require('express');
var bodyParser = require('body-parser');
var twitterAPI = require('./src/twitterAPI');

var app = Express();
var PORT = process.env.PORT || 8889;

var router = Express.Router();

// access_token (bearer token type) for future API requests;
var BEARER_TOKEN;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

router.get('/', (req, res, next) => {
  res.send('This is the /proxy route\n Go to /proxy/twitter to use the twitter proxy');
});

router.get('/twitter', (req, res, next) => {
  return twitterAPI.GetBearerToken()
    .then((data) => {
      const parsedResp = JSON.parse(data);
      // stores bearer token globally for future requests
      BEARER_TOKEN = parsedResp.access_token;
      return res.status(200).send('You have got your bearer token!');
    })
    .catch((error) => {
      console.log('err:', error);
      res.send(error);
      next(error);
  });
});

// tell our app to use its router and /proxy as root route
app.use('/proxy', router);

app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
