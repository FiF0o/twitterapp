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
const locals = {jsBundle, cssBundle, vendorBundle};
console.log('locals', locals)


import { loadScripts } from '../utils/scripts';

router.get('/', loadScripts, (req, res, next) => {
  console.log('locals in  route:', locals)
  console.log('home route');
  res.render('index', { jsBundle,cssBundle, vendorBundle });
});

module.exports = router;
