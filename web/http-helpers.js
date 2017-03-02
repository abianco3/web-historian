var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  var type = path.extname(asset).slice(1);
  fs.readFile(archive.paths.siteAssets + asset, function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/' + type});
    res.end(data);
  });
};

exports.serveSite = function(res, siteUrl, callback) {
  res.writeHead(200, exports.headers);
  res.end(siteUrl);
};


// As you progress, keep thinking about what helper functions you can put here!
