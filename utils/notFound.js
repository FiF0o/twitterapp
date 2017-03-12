/**
 * Created by jonlazarini on 11/03/17.
 */
module.exports = function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
};
