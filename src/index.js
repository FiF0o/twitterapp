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
      var statuses = response.statuses
      $container.append(
        // returns a single string injected in the dom
        statuses.reduce((acc, tweet) => {
          // appends the accumulator to the previous value
          return acc + (
            `
            <div class="well well-lg">
              <section class="tweet-card">
               <div class="row">
                <div class="col-md-7">
                  <p>
                    <h6>tweet</h6>
                    <p>${tweet.text}</p>
                    <p class="small">${tweet.created_at}</p>
                  </p>  
                </div>
                <div class="col-md-5">
                  <h6>profile</h6>
                   <div class="thumbnail">
                    <img class="pull-left" src=${tweet.user.profile_image_url} width="48" height="48" />
                    <h4>
                      <a href="${tweet.user.url}">${tweet.user.name}</a>
                    </h4>
                    <div class="caption">
                      <h5><span class="glyphicon glyphicon-pencil"></span><span>&nbsp;</span><span class="small">${tweet.user.description}</span></h5>
                      <h5><span class="glyphicon glyphicon-map-marker"></span><span>&nbsp;</span><span class="small">${tweet.user.location}</span></h5>
                      <p><span class="glyphicon glyphicon-user"></span><span>&nbsp;</span><span class="small">${tweet.user.followers_count}</span></p>
                    </div>
                 </div>
                </div>
               </div>
               <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-7">
                      <h6>hastags</h6>
                      <!-- renders hashstags array -->
                      <ul class="list-inline">
                        `
                          +
                            tweet.entities.hashtags.reduce((hashAccumulator, hash) => {
                              return hashAccumulator + (
                                `
                                 <li>
                                  <span class="small">${hash.text}</span><span>&nbsp;</span>
                                 </li>
                              `
                              )
                            }, '')
                          +
                        `
                      </ul>
                    </div>
                    <div class="col-md-5">
                      <h6>retweets</h6>
                      <div>
                        <span>
                          <span class="glyphicon glyphicon-star"><span>&nbsp;</span><span class="small">${tweet.favorite_count}</spanclas></span>
                        </span>
                        <span style="margin-left: 1em;">
                          <span class="glyphicon glyphicon-retweet"><span>&nbsp;</span><span class="small">${tweet.retweet_count}</spanclas></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div> 
               </div>
              </section>
             </div>
            `
          )
        // accumulator as empty string to create the template string buffer
        }, '')
      )
    })
    .catch(function(err){
      console.error(err)
    })
})

