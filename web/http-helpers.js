var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var qs = require('../node_modules/qs/dist/qs');

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
  // css, or anything that doesn't change often.
  fs.readFile(asset, callback);
};

exports.serveSite = function(res, siteUrl, callback) {
  var url = qs.parse(siteUrl).url;
  // check if site is archived
  archive.isUrlArchived(url, function(isArchived) {
    if (isArchived) {
      var asset = archive.paths.archivedSites + '/' + url;
      exports.serveAssets(res, asset, function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    } else {
      archive.isUrlInList(url, function(isInList) {
        if (!isInList) {
          archive.addUrlToList(url, function() {
            console.log('hello');
          });
        }
        var asset = path.join(archive.paths.siteAssets, '/loading.html');
        exports.serveAssets(res, asset, function(err, data) {
          res.writeHead(302, {'Content-Type': 'text/html'});
          res.end(data);
        });  
      });
    }
  });
    // if yes send to client
    // if no check if it is in list to be archived
      // if yes send loading page
      // if no add to list
        // send loading page
};


// As you progress, keep thinking about what helper functions you can put here!
