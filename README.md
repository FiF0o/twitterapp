# Twitter app

Static website using the Twitter API to return a tweet feed.</br>
We are using `/search/tweets` twitter endpoint - [search/tweets endpoint](https://dev.twitter.com/rest/reference/get/search/tweets).</br>
App runs on node port or `:8889`.</br></br></br>
Static assets served on port `:8888` if needed.</br>

Dev mode:
```</br>
`npm run dev`
```</br>

The app is bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app).</br>


## Prerequisites

### Routes
- `/` route
- `/tweets` route

### API calls with OAuth2 flow.</br>
[OAUTH2 flow](https://dev.twitter.com/oauth/reference/post/oauth2/token). Bearer token needed - [Obtain a bearer token](https://dev.twitter.com/oauth/application-only) - to access Twitter API endpoints.</br>
Proxy handling OAUTH and Twitter API request is running on node port or `:8889`.</br>
`npm run proxy` and its route is `/search/token`.</br></br>

### Want your own token to extend the app?
Register to the twitter API website.</br>
create a `token.js` file at the root dir exposing your App token `accessToken` and `accessTokenSecret` keys from your Twitter API:</br>
```</br>
module.exports = {
    accessToken: "<YOUR_OWN_ACCESS_TOKEN>"
    accessTokenSecret: "<YOUR_OWN_ACCESS_TOKEN_SECRET>"
}
```


## Scripts
`npm run build` to bundle the app.</br>
`npm run dev` for development mode.</br>
`npm run lint` to lint your code.</br>


## Improvements
