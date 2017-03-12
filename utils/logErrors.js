/**
 * Created by jonlazarini on 11/03/17.
 */
module.exports = function(err, req, res, next) {
  console.error(err.stack)
  next(err)
}
