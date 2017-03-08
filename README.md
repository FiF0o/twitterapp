# Twitter app

Static website using the Twitter API to return a tweet feed.</br>
We are using `/search/tweets` twitter endpoint- [search/tweets endpoint](https://dev.twitter.com/rest/reference/get/search/tweets)</br>
App opens on port `:8888` when developing.</br>
Proxy runs on node port or `:8889`.


## Prerequisites

### API calls with OAuth2 flow.</br>
[OAUTH2 flow](https://dev.twitter.com/oauth/reference/post/oauth2/token). Bearer token needed - [Obtain a bearer token](https://dev.twitter.com/oauth/application-only) - to access Twitter API endpoints.</br>
Proxy handling OAUTH and Twitter API request is running on node port or `:8889`</br>
`npm run proxy` and its route is `/proxy/token`</br></br>

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
`npm run lint` to lint your code</br>


## Improvements
