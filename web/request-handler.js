var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var utils = require('../web/http-helpers');
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
      utils.serveAssets(res, '/index.html');
    }
  } else if (req.url === '/styles.css') {
    utils.serveAssets(res, '/styles.css');
  }

  //res.end(archive.paths.list);
};
