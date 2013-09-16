# RESTly
======

Simple and lightweight self-documenting REST API framework based on Express.

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

Next create your module to handle the request (lib/example.js):
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