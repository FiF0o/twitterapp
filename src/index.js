/**
 * Created by jonlazarini on 06/03/17.
 */
import $ from 'jquery';
import Greet from './greet';
import { GetTweets } from './twitterAPI';

GetTweets()
  .then(data => console.log(data))
  .catch(error => console.log(error));

// console.log($);
// import 'bootstrap/dist/js/bootstrap';
// import 'bootstrap-loader';
console.log($('#app'));
console.log('Hello');
Greet('You!');

