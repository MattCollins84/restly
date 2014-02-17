# RESTly

Simple and lightweight self-documenting REST API framework based on Express.

#### Features
* Define your own routes
* All parameter validation handled for you
* Interactive docs for your API
* Custom authentication for selected routes
* Caching
* Based on Express, use any existing Express middleware

#### Coming soon
* Better documentation
* Better parameter validation
* Better error catching and general improvements
* Make a request..!

## Quick start

First up, install RESTly:
```
npm install restly
```

Then, create a routes file, in JSON (routes.json), where you will define your first API:

```
{
  "routes": [
    {
      "title": "Example API call",
      "description": "Example API call",
      "section": "General API Calls",
      "endpoint": "/example",
      "method": "get",
      "library": "example.js",
      "callback": "getExample",
      "parameters": {
        "foo": {
          "required": true,
          "type": "string",
          "regex": false,
          "description":"My very own parameter",
          "example":"bar"
        }
      }
    }
  ]
}
```

Next create your module to handle the request (lib/example.js).

Each callback will be passed two parameters:
* opts - a key/value object containing all the supplied values
* callback - callback function, with the first arguement being an error, while the second is the response data

```
var getExample = function(opts, callback) {
  return callback(null, {foo: opts.foo});
}

module.exports = {
  getExample: getExample
}
```

And finally, set up your new API - telling restly where your routes file and libraries are located:
```
var restly = require('restly');
restly.init('./routes.json', {lib: "includes/"});
```

Access this route via a HTTP get:

```
CURL -X GET 'http://localhost:8000/example?foo=bar'
```

## More options
When you init RESTly, you can supply several options to customise your API. The init function takes two parameters:
* __routes__ - path to the routes file, relative to the file calling it
* __options__ (optional) - customisable options, defaults shown below

```
{
  lib: "", // directory that contains your libraries
  protocol: "http", // public protocol, can be http or https (for generating example curl requests in docs)
  domain: "localhost", // public domain (for generating example curl requests in docs)
  port: 8000, // public port (for generating example curl requests in docs)
              // if protocol is "https", port defaults to 8443
  ssl_private_key: "sslcert/server.key", // SSL private key file
  ssl_certificate: "sslcert/server.crt", // SSL certificate file
  name: "My API", // Name of the API, for building the docs
  description: "Interactive API docs", // Description, again for docs
  docs_endpoint: "/", // the location to access the docs from
  caching: false // whether to enable caching or not (bool)
}
```

## Defining routes
Each route has a number of parameters that can be used to define it:

* __title__ - short description
* __description__ - longer description
* __section__ - the group of API calls this belongs to
* __endpoint__ - the endpoint to use to access this API (in express format)
* __method__ - HTTP method (GET/POST/PUT/DELETE)
* __library__ - the .js library that contains the callback to execute
* __callback__ - the Javascript function to use as the callback
* __parameters__ - Javascript object defining parameter

Each parameter has several options, only some may apply to certain data types:

* __required__ - is this required (bool)
* __type__ - data type
* __regex__ - should the value match a regular expression? (e.g. '[0-9]{2}[a-zA-Z]{3})
* __default__ - a default value if left blank
* __values__ - if type=enum, a Javascript array of allowed values (["one", "two", "three"])
* __min/max__ - minimum/maximum value (for 'int' and 'float' types)
* __min_length/max_length__ - minimum/maximum length for strings
* __description__ - description of the parameter
* __example__ - example value

## Data types
* __string__
* __int__
* __float__
* __date__ - can be expressed as a date (YYYY-MM-DD hh:mm:ss) or as an interval (3 months/2 days/5 years/-5 days)
* __bool__
* __collection__ - essentially an array, expressed as a Javascript array (["james", "scott", "dave"])
* __number collection__ - a collection that only allows numbers as values
* __date collection__ - a collection that only allows dates as values
* __enum__ - use in conjunction with 'values' to determine a group of allowed values
* __url_ - only allows valid URLs as values
* __email__ - only allows valid email addresses as values

## Express compatibility
RESTly is based on the excellent Express framework. Because of this, all routes and endpoints can be defined the same as you would in Express, and you can also use any existing Express middleware, or of course create your own.

__NOTE:__ If you define an endpoint with parameters built in (i.e. endpoint: "/user/:user_id/edit") and you additionally define a parameter with the name 'user_id', the value of opts.user_id will come from the endpoint, rather than the parameter. For example, with the endpoint "/user/:user_id/edit":

```
curl 'http://localhost:8000/user/135/edit?user_id=999'
opts {
  user_id: 135
}

```

To use middleware:
```
var restly = require('restly');
restly.use(middleware.someMethod());
restly.init('./routes.json', {lib: "includes/"});
```

NOTE: RESTly uses the express.bodyParser middleware internally already, as so:

```
express.bodyParser({ keepExtensions: true, uploadDir: '/tmp' })
```

## Add authentication
Add an 'authentication' section to your 'routes.json' file. This is defined very much like a standard route:
```
{
  "authentication": {
    "standard": {
      "name": "Standard authentication",
      "library": "authentication.js",
      "callback": "standardAuth",
      "parameters": {
        "api_key": {
          "required": true,
          "type": "string",
          "description": "Your API key",
          "example": "sad7864hjsdf7"
        }
      }
    }
  },
  "routes": [
    ....
  ]
}
```
And specify which authentication method you would like to use for each individual route (optional):
```
"routes": [
    {
      "title": "Example API call",
      "description": "Example API call",
      "authentication": "standard",
      "section": "General API Calls",
      "endpoint": "/example",
      "method": "get",
      "library": "example.js",
      "callback": "getExample",
      "parameters": {
        ...
      }
    }
  ]
```
Authentication parameters will be added to the route and passed to the authentication callback first. If this callback does not return an error, the standard route callback is called in the usual way.

Authentication modules should be created in the same way as standard modules.

## Add caching (requires [Redis](http://www.redis.io/) to be installed)
To turn caching on, do this (By default, RESTly will use Redis on localhost with the default port):
```
restly.init('./routes.json', {lib: "includes/", caching: true}); // using defaults
restly.init('./routes.json', {lib: "includes/", caching: "redis://host.for.redis.com:1337"}); // specify the host and the port
restly.init('./routes.json', {lib: "includes/", caching: "redis://host.for.redis.com"}); // just change the host
```

In a route definition, add a caching option (bool) to turn caching on or off.
```
"routes": [
    {
      "title": "Example API call",
      "description": "Example API call",
      "authentication": "standard",
      "caching": "true",
      "section": "General API Calls",
      "endpoint": "/example",
      "method": "get",
      "library": "example.js",
      "callback": "getExample",
      "parameters": {
        ...
      }
    }
  ]
```

Turning caching on for a particular route will add a special parameter '_use_cache', which defaults to true. This can be set to false in order to avoid the cache.

## Documentation

Docs are auto generated and by default are located at the top level of your API (e.g. http://localhost:8000/). You can change the 'docs_endpoint' init option to alter this.

![Docs](https://raw.github.com/MattCollins84/restly/master/images/docs.png)
