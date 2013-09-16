/***
  
  RESTly API Framework, based on Express

***/

var _       = require('underscore'),
    fs      = require('fs'),
    routes  = require('./lib/routes.js');

var restly = {};

// set up express
var express = require('express');
restly.express = express();

// force express to parse posted and putted parameters
restly.express.use(express.bodyParser({ keepExtensions: true, uploadDir: '/tmp' }));

// init
restly.init = function(r, opts) {

  // make sure all our defaults are set
  var opts = defaultOpts(opts);

  // get our routes
  var routesCollection = routes.getRoutes(r);

  // for each route
  for(var r in routesCollection) {
    
    var apicall = routesCollection[r];
    
    apicall.library = opts.libraries+apicall.library;

    // set up a express listener for each call
    switch(apicall.method) {
      case 'put': 
      
        this.express.put(apicall.endpoint, function (req,res) {
            routes.parseRequest(apicall, req, res);           
        });
        break;

      case 'post':

        this.express.post(apicall.endpoint, function (req,res) { 
          routes.parseRequest(apicall, req, res); 
        });
        break;

      case 'delete': 

        this.express.delete(apicall.endpoint, function (req,res) { 
          routes.parseRequest(apicall, req, res); 
        });
        break;   

      case 'get': 
        
        this.express.get(apicall.endpoint, function (req,res) { 
          routes.parseRequest(apicall, req, res); 
        });
        break;    
    }
  }

  // listen on the specified port
  var server = this.express.listen(opts.port);

  // this function is called when you want the server to die gracefully
  // i.e. wait for existing connections
  var gracefulShutdown = function() {
    console.log("Received kill signal, shutting down gracefully.");
    server.close(function() {
      console.log("Closed out remaining connections.");
      process.exit()
    });
    
    // if after 
    setTimeout(function() {
        console.error("Could not close connections in time, forcefully shutting down");
        process.exit()
   }, 3*1000);
    
  }

  // listen for TERM signal .e.g. kill <pid>
  process.on ('SIGTERM', gracefulShutdown);

  // listen for INT signal e.g. Ctrl-C
  process.on ('SIGINT', gracefulShutdown);

}

// default options
var defaultOpts = function(opts) {

  // define defaults
  var defaults = {
    port: 8000,
    libraries: ""
  }

  // change defaults with supplied opts
  if (!_.isUndefined(opts) && _.isObject(opts)) {

    for (var o in opts) {

      if (!_.isUndefined(defaults[o])) {
        defaults[o] = opts[o];
      }

    }

  }

  return defaults;

}

// export
module.exports = restly