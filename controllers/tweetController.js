/**
 * Created by jonlazarini on 20/04/17.
 */
import pug from 'pug'
import fs from 'fs'
import path from 'path'
import oauth from '../services/oauth'

//TODO Refactor oauth controller
exports.tweetController = (req, res) => {

  // default url for testing - not qs params customized
  let url = 'https://api.twitter.com/1.1/search/tweets.json?q=userexperience&count=5'

  oauth.fetch(url)
    .then((data) => {
      const chunk = JSON.parse(data).statuses // grabs the array
      const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName
      // read template from file system for data injection on client runtime later
      const tmpl = fs.readFileSync(path.resolve(__dirname, '../src/views/', 'example.pug'),'utf-8')
      // compile the js source code/function
      const compiledFunction = pug.compile(tmpl)
      //injects data from the API into the template for rendering
      const renderedTemplate = compiledFunction({chunk, assetsByChunkName})

      // send html fragment to the client
      res.send(renderedTemplate)

    })
    .catch((e) => console.error(e))
}
