/**
 * Created by jonlazarini on 06/03/17.
 */

/** Client side JS **/

import $ from 'jquery';
import Greet from './greet';
// import { GetTweets } from './twitterAPI';

// GetTweets()
//   .then(data => console.log(data))
//   .catch(error => console.log(error));

Greet('You!');

var $button = $('button#load-more')
var $container = $('#extra-tweets')

$button.on('click', function() {
  window.fetch('http://localhost:8889/tweets/proxy')
    .then(function(response) {
      // getting json obj from the promise
      return response.json()
    })
    .then(function(response) {
      // resolving the promise
      console.log(response)
    })
    .catch(function(err){
      console.log(err)
    })
})

console.log('bundle')
console.log('bundle')
