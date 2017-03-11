/**
 * Created by jonlazarini on 09/03/17.
 */
export const loadScripts = (req, res, next) => {
  var toto = 'toto';
  console.log('toto var in local MW:\n ', toto);
  next();
};
