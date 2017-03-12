/**
 * Created by jonlazarini on 08/03/17.
 */
const router = require('express').Router();
import { readFileSync } from 'jsonfile';

import { loadScripts } from '../utils/scripts';


const manifestPath = `${process.cwd()}/public/build-manifest.json`;
const manifest = readFileSync(manifestPath);


const jsBundle = manifest['bundle.js'];
const cssBundle = manifest['style.css'];
const vendorBundle = manifest['vendors.js'];
const locals = {jsBundle, cssBundle, vendorBundle};


router.get('/', loadScripts, (req, res, next) => {
  res.render('index', { jsBundle,cssBundle, vendorBundle });
});

module.exports = router;
