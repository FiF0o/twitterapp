/**
 * Created by jonlazarini on 08/03/17.
 */
var router = require('express').Router();

/** Routes **/
import tweets from './tweets';
import home from './home';


// split up route handling
router.use('/', home);
router.use('/', tweets);


module.exports = router;
