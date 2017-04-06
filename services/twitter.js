/**
 * Created by jonlazarini on 05/04/17.
 */
const oauth = require('./oauth')

const twitterApiBaseUrl = 'https://api.twitter.com'

exports.mentions = (req, res) => {
  var TWEET_CURSOR = req.app.get('TWEET_CURSOR')
  var Q_PARAMS = req.app.get('Q_PARAMS')
  var moreTweets = 10

  let url = `${twitterApiBaseUrl}/1.1/search/tweets.json?`

  if (Q_PARAMS)     url += `q=${Q_PARAMS}&`
  if (TWEET_CURSOR) url += `since_id=${TWEET_CURSOR}&`
  url += `count=${moreTweets}&`

  oauth.fetch(url)
    .then((data) => {
      var tweetsChunk = JSON.parse(data)
      // get the new cursor
      var NEW_TWEET_CURSOR = tweetsChunk.statuses[tweetsChunk.statuses.length-1].id_str
      res.app.set('TWEET_CURSOR', NEW_TWEET_CURSOR)
      res.status(200).send(tweetsChunk)
    })
    .catch((err) => console.log('err:', err))
}
