/**
 * Created by jonlazarini on 08/03/17.
 */
const router = require('express').Router();
import { readFileSync } from 'jsonfile';


const manifestPath = `${process.cwd()}/public/build-manifest.json`;
const manifest = readFileSync(manifestPath);


const jsBundle = manifest['bundle.js'];
const cssBundle = manifest['style.css'];
const vendorBundle = manifest['vendors.js'];


router.get('/tweets', (req, res, next) => {
  const data = {
    foo: 'bar',
    bat: 'baz'
  };
  res.render('tweets', { data, jsBundle, cssBundle, vendorBundle });
});

module.exports = router;
