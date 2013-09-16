/***
  Routes controller, of sorts
  All routes logic and management goes here
***/

var _   = require('underscore'),
    fs  = require('fs'),
    validate = require('./validate.js');

var getRoutes = function(r) {
  
  // verify routes are supplied correctly
  if (_.isUndefined(r) || !_.isString(r) || !fs.existsSync(r)) {
    console.log('Routes file not supplied or not present.');
    process.exit(0);
  }

  r = fs.readFileSync(r, {encoding: 'utf-8'});

  try {
    r = JSON.parse(r);
  } catch(e) {
    console.log('Cannot parse routes file as JSON');
    console.log(e);
    process.exit(0);
  }

  return r.routes;
}

// when request is received, check whether the calls parameters are present
// and match those defined in the routes
var parseRequest = function(apicall, req, res) {
  
  var opts;
  
  // post & puts parameters are in req.body, but get parameters are in req.query
  switch(req.route.method) {
    case 'post':
    case 'put':
    case 'delete':
      opts = _.clone(req.body);      
      break;
    default:
      opts = _.clone(req.query);
  }
  
  var bits = apicall.endpoint.split("/");
  
  // the error messages array
  var errors = validate.parameters(apicall, opts, req.files);

  // if there are some errors
  if(errors.length) {
    
    // return 404 and the errors
    return res.send(404, { "success": false, "msg": "There were errors in your request", "data": errors} );

  }

  delegate(apicall, opts, req, res);

}

var delegate = function (apicall, opts, req, res) {
    
  // if there is a call back for this API call
  if(apicall.callback && apicall.library) {
    
    // load the library
    var lib = require(apicall.library);
    
    // call the callback
    lib[apicall.callback](opts, function(err, data) { 

      // respond with returned data or an error message
      if (err) {
        
        // send the response back to the client
        var sendResponse = { 
          "success": false, 
          "error": err,
          "data": data
        }
        
        return res.send(200, sendResponse);    

      }

      else {
        
        // send the response back to the client
        var sendResponse = { 
          "success": true, 
          "data": data
        }

        return res.send(404, sendResponse);
    

      }

    });  
  }

}

module.exports = {
  getRoutes: getRoutes,
  parseRequest: parseRequest
}