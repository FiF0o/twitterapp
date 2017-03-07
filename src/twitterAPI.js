/**
 * Created by jonlazarini on 06/03/17.
 */
import { XMLHttpRequest } from 'xmlhttprequest';
import { accessToken, accessTokenSecret } from '../token';

/**
 * Required by twitter API encoding tokens
 * https://dev.twitter.com/oauth/application-only
 *
 * more about OAUTH2 and Twitter API: https://dev.twitter.com/oauth/reference/post/oauth2/token
 * **/

/* eslint-disable */
const encodedToken = Buffer.from(`${accessToken}:${accessTokenSecret}`).toString('base64'); // base64 app token encoding as btoa (browser api) is not supported - needed to the server to consume
// const encodedToken2 = btoa(encodeURIComponent(`${accessToken}:${accessTokenSecret}`));
const url = 'https://api.twitter.com/oauth2/token';
const httpHeaders = {
  /* eslint-disable */
  'Authorization': `Basic ${encodedToken}`,
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
};
const reqBearer = {
  method: 'POST',
  url: url,
  headers: httpHeaders,
  mode: 'cors',
  cache: 'default',
  // header body needed by bootstrap
  body: 'grant_type=client_credentials',
};


/**
 *
 * @param obj
 * @returns {Promise}
 */
const request = obj => (
  // creates XMLHTTPRequest - headers, body
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(obj.method || 'GET', obj.url);
    if (obj.headers) {
      Object.keys(obj.headers).forEach((key) => {
        xhr.setRequestHeader(key, obj.headers[key]);
      });
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(obj.body);
  })
);

/**
 *
 * @constructor
 */
export const GetBearerToken = () => (
  // returns a promise fetching the bearer token - access_token
  request(reqBearer)
);

/**
 *
 * @param url
 * @returns {Promise}
 * @constructor
 */
export const GetTweets = () => (
  // returns a promise https://dev.twitter.com/rest/reference/get/search/tweets
  // console.log(url)
  new Promise((resolve, reject) => {
    // replace with ajax
    setTimeout(() => {
      if (true) {
        resolve('success!');
      } else {
        reject('boo! :(');
      }
    }, 2000);
  })
);

// export default GetTweets;
/** use -d for body request as we are sending as "application/x-www-form-url-encoded" **/
// curl -X POST --header "Authorization: Basic <ENCODED_TOKEN>" --header "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -d "grant_type=client_credentials" https://api.twitter.com/oauth2/token
