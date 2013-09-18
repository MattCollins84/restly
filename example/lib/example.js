var one = function(opts, callback) {
  return callback(null, {you_entered: opts.foo});
}

var two = function(opts, callback) {
  return callback(null, {your_params: opts});
}

var standardAuth = function(opts, callback) {

  if (opts.api_key != 'key') {
    return callback({error: "Invalid api_key, it must be 'key'"}, null);
  }

  return callback(null, null);

}

module.exports = {
  one: one,
  two: two,
  standardAuth: standardAuth
}