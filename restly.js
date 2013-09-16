/***
  
  RESTly API Framework, based on Express

***/

var _       = require('underscore'),
    fs      = require('fs'),
    routes  = require('./lib/routes.js');

// global for exporting
var restly = {};

// set up express
var express = require('express');
var app = express();

// force express to parse posted and putted parameters
app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/tmp' }));

// define public directory for docs
app.use(express.static(__dirname+'/public'));

// wrapper for passing middleware to express
restly.use = function(mw) {
  app.use(mw);
}

// init
restly.init = function(r, opts) {

  // make sure all our defaults are set
  var opts = defaultOpts(opts);

  // get our routes
  var routesCollection = routes.getRoutes(r);

  // for each route
  for(var r in routesCollection) {
    
    var apicall = routesCollection[r];
    
    apicall.library = process.cwd()+"/"+opts.lib+apicall.library;

    // set up a express listener for each call
    switch(apicall.method) {
      case 'put': 
      
        app.put(apicall.endpoint, function (req,res) {
            routes.parseRequest(apicall, req, res);           
        });
        break;

      case 'post':

        app.post(apicall.endpoint, function (req,res) { 
          routes.parseRequest(apicall, req, res); 
        });
        break;

      case 'delete': 

        app.delete(apicall.endpoint, function (req,res) { 
          routes.parseRequest(apicall, req, res); 
        });
        break;   

      case 'get': 
        
        app.get(apicall.endpoint, function (req,res) { 
          routes.parseRequest(apicall, req, res); 
        });
        break;    
    }

    // documentation page
    app.get('/', function(req, res) {
      
      // prepare the page data
      var page = { 
                    routes: routesCollection,
                    config: opts
                  };
      
      // render the channel list page
      res.render(process.cwd()+"/node_modules/restly/views/index.jade", page);
      
    });
  }

  // listen on the specified port
  var server = app.listen(opts.port);

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
    lib: "",
    protocol: "http",
    domain: "localhost",
    port: 8000,
    name: "My API",
    description: "Interactive API docs"
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