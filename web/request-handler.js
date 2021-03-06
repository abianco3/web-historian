var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var utils = require('../web/http-helpers');
var url = require('url');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
    
  if (req.url === '/') {
    if (req.method === 'POST') {
      // do some thing
      var url = '';
      req.on('data', function(chunk) {
        url += chunk;
        console.log(chunk);
      });
      req.on('end', function(err) {
        if (err) {
          console.error(err);
        } else {
          utils.serveSite(res, url);
        }
      });
    } else {
      var asset = path.join(archive.paths.siteAssets, '/index.html'); 
      utils.serveAssets(res, asset, function(err, data) {
        utils.sendResponse(res, 200, {'Content-Type': 'text/html'}, data);
      });
    }
  } else if (req.url === '/styles.css') {
    var asset = path.join(archive.paths.siteAssets, '/styles.css'); 
    utils.serveAssets(res, asset, function(err, data) {
      utils.sendResponse(res, 200, {'Content-Type': 'text/css'}, data);
    });
  } else {
    utils.serveSite(res, req.url);
  }

  //res.end(archive.paths.list);
};
