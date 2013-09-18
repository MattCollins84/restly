/***
  Routes controller, of sorts
  All routes logic and management goes here
***/

var _   = require('underscore'),
    redis = require('redis');

// return cache value if available
var get = function(cache, key, callback) {
  
  // no cache options
  if (!cache) {
    return callback(null, null);
  }

  var client = redis.createClient(cache.port, cache.host);

  console.log('getting', key);
  client.get(key, function(err, data) {
    return callback(err, JSON.parse(data));
  });
  
}

// set cache value
var set = function(cache, key, value) {
  
  // no cache options
  if (!cache) {
    return false;
  }

  var client = redis.createClient(cache.port, cache.host);
  console.log('setting', key, JSON.stringify(value));
  client.set(key, JSON.stringify(value), function(err, data) {});

}

// delete a value
var del = function(key) {

  // no cache options
  if (!cache) {
    return false;
  }

  var client = redis.createClient(cache.port, cache.host);
  console.log('deleting', key);
  client.del(key);

}

// parse the cache options
var parseOptsCache = function(c) {

  if (!c) return false;

  if (c !== true && !c.match(/redis/)) return false;

  if (c !== true && !_.isString(c)) return false;

  // default cache values
  var cache = {
    type: 'redis',
    host: 'localhost',
    port: 6379
  };

  // return defaults if true is passed in
  if (c === true) return cache;

  // get bits
  var bits = c.split("://");

  if (bits.length == 2) {

    // only support redis for now
    if (bits[0] != 'redis') return false;

    cache.type = bits[0];
    cache.host = bits[1].split(":")[0];
    cache.port = (_.isNumber(bits[1].split(":")[1])?bits[1].split(":")[1]:6379);

    return cache;

  }

  // not a valid value
  else {
    return false;
  }

}

module.exports = {
  get: get,
  set: set,
  del: del,
  parseOptsCache: parseOptsCache
}