var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data) {
    archive.readListOfUrls();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
  //res.end(archive.paths.list);
};
