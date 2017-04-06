/**
 * Created by jonlazarini on 05/04/17.
 */
const OAuth = require('oauth')
const util = require('util')
const token = require('../config/token')

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  token.consumerToken, token.consumerTokenSecret, '1.0A', null, 'HMAC-SHA1'
)

exports.fetch = (url) => {
  return new Promise((resolve, reject) => {
    oauth.get(url, token.accessKey, token.accessSecret, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
