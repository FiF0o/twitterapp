/**
 * Created by jonlazarini on 06/03/17.
 */
import request from '../twitterService';
/**
 *
 * @constructor
 */
export const GetBearerToken = xhrReq => (
  // returns a promise fetching the bearer token - access_token
  request(xhrReq)
);

/**
 *
 * @param qUrl
 * @constructor
 */
export const GetTweets = qUrl => (
  // new Promise((resolve, reject) => {
  //   // replace with ajax
  //   setTimeout(() => {
  //     if (true) {
  //       resolve('success!');
  //     } else {
  //       reject('boo! :(');
  //     }
  //   }, 2000);
  // })
  request(qUrl)
    .then(data => console.log(data))
    .catch(err => console.log(`Outch: ${err}`))
);
