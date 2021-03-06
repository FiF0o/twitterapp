/**
 * Created by jonlazarini on 08/03/17.
 */
const router = require('express').Router();
import { readFileSync } from 'jsonfile';

import { loadScripts } from '../utils/scripts';


router.get('/', loadScripts, (req, res, next) => {
  const mode = process.env.NODE_ENV

  if (mode === 'production') {
    const manifestPath = `${process.cwd()}/public/build-manifest.json`;
    const manifest = readFileSync(manifestPath);
    const jsBundle = manifest['bundle.js'];
    const cssBundle = manifest['style.css'];
    const vendorBundle = manifest['vendors.js'];

    res.render('index', {env: mode, jsBundle, cssBundle, vendorBundle})

  } else {
    var assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName
    res.render('index', {assetsByChunkName});
  }

});


module.exports = router;
