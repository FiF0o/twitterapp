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

$('#toto').click(() => {
  console.log(this.href);
});

Greet('You!');

