/***
  
  RESTly API Framework, based on Express

***/

var _       = require('underscore'),
    fs      = require('fs'),
    routes  = require('./lib/routes.js'),
    caching  = require('./lib/caching.js');

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
  for(var rc in routesCollection) {
    
    var apicall = routesCollection[rc];
    
    // add authentication object to apicall
    if (apicall.authentication) {
      
      // get authentication methods
      apicall.authentication = routes.getAuthentication(r, apicall.authentication);

      // combine api call params with authentication params
      apicall = routes.combineWithAuthentication(apicall);

      routesCollection[rc] = apicall;
    }

    // get the full and correct path for the library
    apicall.library = process.cwd()+"/"+opts.lib+apicall.library;

    // and for the authentication library, if required
    if (apicall.authentication && apicall.authentication.library) {
      apicall.authentication.library = process.cwd()+"/"+opts.lib+apicall.authentication.library;
    } 

    // are we enabling caching?
    if (!opts.caching || !apicall.caching) {
      apicall.caching = false;
    }

    else {
      apicall.caching = caching.parseOptsCache(opts.caching);

      // add special _use_cache param to API call
      apicall.parameters._use_cache = {
        "required": false,
        "type": "bool",
        "description":"Do you want to read from the cache",
        "default": true
      }
    }

    // set up a express listener for each call
    switch(apicall.method) {
      case 'put': 
      
        (function(ac) {
          app.put(ac.endpoint, function (req,res) {
            routes.parseRequest(ac, req, res);           
          });
        })(apicall);
        break;

      case 'post':

        (function(ac) {
          app.post(ac.endpoint, function (req,res) {
            routes.parseRequest(ac, req, res);           
          });
        })(apicall);
        break;

      case 'delete': 

        (function(ac) {
          app.delete(ac.endpoint, function (req,res) {
            routes.parseRequest(ac, req, res);           
          });
        })(apicall);
        break;   

      case 'get': 
        
        (function(ac) {
          app.get(ac.endpoint, function (req,res) {
            routes.parseRequest(ac, req, res);           
          });
        })(apicall);
        break;    
    }

  }

  // documentation page
  app.get(opts.docs_endpoint, function(req, res) {

    var sections = [];
    for (var r in routesCollection) {
      sections.push(routesCollection[r].section);
    }

    sections = _.uniq(sections)

    // prepare the page data
    var page = { 
                  routes: routesCollection,
                  config: opts,
                  section: false,
                  sections: sections,
                  docs_endpoint: opts.docs_endpoint
                };
    
    // render the channel list page
    res.render(process.cwd()+"/node_modules/restly/views/index.jade", page);
    
  });

  // documentation page by section
  app.get(opts.docs_endpoint+"section/:section", function(req, res) {
    
    var sections = [];
    for (var r in routesCollection) {
      sections.push(routesCollection[r].section);
    }

    sections = _.uniq(sections)

    // prepare the page data
    var page = { 
                  routes: routesCollection,
                  config: opts,
                  section: req.params.section,
                  sections: sections,
                  docs_endpoint: opts.docs_endpoint
                };
    
    // render the channel list page
    res.render(process.cwd()+"/node_modules/restly/views/index.jade", page);
    
  });

  // listen on the specified port
  if (opts.protocol == 'https') {
    // set up for secure server
    var fs = require('fs');
    var https = require('https');

    try {
        var privateKey  = fs.readFileSync(opts.ssl_private_key, 'utf8');
        var certificate = fs.readFileSync(opts.ssl_certificate, 'utf8');
    } catch (e) {
        if (e.code === 'ENOENT') {
            console.log('\n    Cannot find SSL private key or certificate file.');
            console.log('   Make sure "'+opts.ssl_private_key+'" and "'+opts.ssl_certificate+'" exist.')
            
            throw e;
        }
    }

    var credentials = { key: privateKey, cert: certificate };
    
    var server = https.createServer(credentials, app);
    
    server.listen(opts.port);
  } else {
      var server = app.listen(opts.port);
  }

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
    ssl_private_key: "sslcert/server.key",
    ssl_certificate: "sslcert/server.crt",
    name: "My API",
    description: "Interactive API docs",
    docs_endpoint: "/",
    caching: false
  }

  // change defaults with supplied opts
  if (!_.isUndefined(opts) && _.isObject(opts)) {

    for (var o in opts) {

      if (!_.isUndefined(defaults[o])) {
        defaults[o] = opts[o];
      }

    }

  }

  // check for sane protocol values
  if (!_.isString(defaults.protocol)) { defaults.protocol = "http"; }
  defaults.protocol = defaults.protocol.toLowerCase();
  if (defaults.protocol != 'http' && defaults.protocol != 'https') { defaults.protocol = 'http'; }
  
  // sane port values
  if (!_.isNumber(defaults.port)) {
    // sane secure server values
    if (defaults.protocol == 'https') {
      defaults.port = 8443;
    } else {
      defaults.port = 8000;
    }
  }
  
  // sane docs endpoints value
  if (defaults.docs_endpoint != "/") {
    if (defaults.docs_endpoint == "") {
      defaults.docs_endpoint = "/";
    } else {
      defaults.docs_endpoint = defaults.docs_endpoint.replace(/^\/?(.*?)\/?$/, '/$1/');
    }
  }

  // return
  return defaults;

}

// export
module.exports = restly
