/**
 * Created by jonlazarini on 08/03/17.
 */
import { XMLHttpRequest } from 'xmlhttprequest';

/**
 *
 * @param obj
 * @returns {Promise}
 */
const requestService = obj => (
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
        // reject(xhr.statusText);
        reject(xhr.responseText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(obj.body);
  })
);

export default requestService;
