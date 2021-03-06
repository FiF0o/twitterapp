/**
 * Created by jonlazarini on 06/03/17.
 */

/** Client side JS **/

import $ from 'jquery';
import Greet from './greet';
// import { GetTweets } from './twitterAPI';
import { popoverControl } from './controls/popover'
import { ValidateText } from './client-utils/dataValidation'


// GetTweets()
//   .then(data => console.log(data))
//   .catch(error => console.log(error));

Greet('You!');

var $button = $('button#load-more')
var $container = $('#extra-tweets')

$button.on('click', function() {
  // window.fetch('https://localhost:8889/tweets/proxy')
  window.fetch('/tweets/proxy')
    .then(function(response) {
      // getting json obj from the promise
      return response.json()
    })
    .then(function(response) {
      // resolving the promise

      // debug
      // throw new Error('blabla debug')

      var statuses = response.tweetsChunk.statuses
      var lastTweet = response.NEW_TWEET_CURSOR
      // console.log('statuses: ', statuses)

      $container.append(
        // returns a single string injected in the dom
        statuses.reduce((acc, tweet) => {
          // appends the accumulator to the previous value
          return acc + (
            `
            <div class="well well-lg">
              <section class="tweet-card" data-id="${tweet.id_str}">
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

      // scroll to last element of the list
      $('body').animate({
        scrollTop: $(`[data-id="${lastTweet}"]`).offset().top,
      }, {
        duration: 1000,
        complete: () => {
          // checks lastTweet id for debugging
          console.log(lastTweet, ' in CB()')
        }
      })

    })
    .catch(function(err){
      console.error(err)
      var popoverOptions = {
        animation: true,
        placement: 'top',
        delay: 500,
        trigger: 'manual',
        html: 'true',
        title: `<div class="toto">Error</div>`,
        content: `<div class="class">Cannot load more tweets!</div>`,
        //override default popover style - injecting title, content within template
        template: `<div class="popover"><div class="arrow"></div><div class="popover-title">title</div><div class="popover-content">content</div></div>`
        // container: '#load-more',
      }
      popoverControl($button, popoverOptions) //popover is called on #load-more
      //TODO Disable button?
    })
})


/** data validation clientside **/

$('input#twitter').blur(() => {
  var isAlphaNum = $('input#twitter').val()
  ValidateText(isAlphaNum)
})


/** section for clientside compiled template **/
$('#load-template').on('click', () => {
  window.fetch('/test/controller')
    .then(function(response) {
      // getting html fragment
      return response.text()
    })
    .then(function(response) {
      console.log(response)
      console.log($('div#appender'))
      // appends html fragment in parent page
      $('div#appender').append(response)
    })
})
