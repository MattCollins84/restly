# RESTly

Simple and lightweight self-documenting REST API framework based on Express.

#### Features
* Define your own routes
* Interactive docs for your API
* Easy to add custom authentication to selected routes
* Based on Express, use any existing Express middleware

#### Coming soon
* Optional caching
* Make a request..!

## Quick start

First up, install RESTly:
```
npm install restly
```

Then, create a routes file, in JSON (routes.json):

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

Each module must consists of two paramters:
* opts - a key/value object containing all the supplied values
* callback - callback function, witht he first arguement being an error, the second some data

```
var getExample = function(opts, callback) {
  return callback(null, {foo: opts.foo});
}

module.exports = {
  getExample: getExample
}
```

And finally, set up your new API:
```
var restly = require('restly');
restly.init('./routes.json', {lib: "includes/"});
```

Access this route via a HTTP get:

```
CURL -X GET 'http://localhost:8000?foo=bar'
```

## Defining routes
Each route has a number of parameters that can be used to define it:

* title - short description
* description - longer description
* section - the group of API calls this belongs to
* endpoint - the endpoint to use to access this API (in express format)
* method - HTTP method (GET/POST/PUT/DELETE)
* library - the .js library that contains the callback to execute
* callback - the Javascript function to use as the callback
* parameters - Javascript object defining parameter

Each parameter has several options:

* required - is this required (bool)
* type - data type
* regex - should the value match a regular expression? (e.g. '[0-9]{2}[a-zA-Z]{3})
* default - a default value if left blank
* values - if type=enum, a Javascript array of allowed values (["one", "two", "three"])
* min/max - minimum/maximum value (for 'int' and 'float' types)
* min_length/max_length - minimum/maximum length for strings
* description - description of the parameter
* example - example value

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
