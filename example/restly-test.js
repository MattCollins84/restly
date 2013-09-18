// resulty class
var restly = require('restly');

// go!
restly.init('./routes.json', {lib: "lib/", docs_endpoint: "/docs", caching: true });