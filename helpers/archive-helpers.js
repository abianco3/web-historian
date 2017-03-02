var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      callback(data.split('\n'));      
    }
  });
};

exports.isUrlInList = function(url, callback) {
  // read sites.txt file
  exports.readListOfUrls(function(urlList) {
    // see if url is in list
    var isInList = urlList.indexOf(url) !== -1;
    // run callback
    callback(isInList);
  });
};

exports.addUrlToList = function(url, callback) {
  // open sites.txt
  fs.appendFile(exports.paths.list, url + '\n', (err) => {
    if (err) {
      console.error(err);
    }
    // use fs.open with 'a' flag to add the ur;
    callback(url);
  });
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
