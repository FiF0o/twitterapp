/**
 * Created by jonlazarini on 05/04/17.
 */
const OAuth = require('oauth')
const util = require('util')
var consumerToken
var consumerTokenSecret
var accessKey
var accessSecret

if (process.env.NODE_ENV === 'development') var token = require('../config/token')

  consumerToken = process.env.CONSUMER_TOKEN || token.consumerToken
  consumerTokenSecret = process.env.CONSUMER_TOKEN_SECRET || token.consumerTokenSecret
  accessKey = process.env.ACCESS_KEY || token.accessKey
  accessSecret = process.env.ACCESS_SECRET || token.accessSecret

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  consumerToken, consumerTokenSecret, '1.0A', null, 'HMAC-SHA1'
)

exports.fetch = (url) => {
  return new Promise((resolve, reject) => {
    oauth.get(url, accessKey, accessSecret, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
