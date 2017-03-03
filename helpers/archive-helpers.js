var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

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
      callback(data.split('\n').slice(1));      
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
  fs.appendFile(exports.paths.list, '\n' + url, (err) => {
    if (err) {
      console.error(err);
    }
    // use fs.open with 'a' flag to add the ur;
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  //go to sites directory
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if (err) {
      console.error(err);
    } else {
      var isArchived = files.indexOf(url) !== -1;
      callback(isArchived);
    }
  });
    //see website archive exists
      //callback on boolean if it archive exists  
};

exports.downloadUrls = function(urls) {
  // iterate through the urls
  urls.forEach((url) => {
    exports.isUrlArchived(url, function(isArchived) {
      console.log(url);
      if (!isArchived) {
        http.get('http://' + url, (res) => {
          var statusCode = res.statusCode;
          if (statusCode !== 200) {
            console.error('invalid request', statusCode);
          } else {
            // on success, write the response body to a file in the archive list
            var file = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
              file += chunk;
            });
            res.on('end', () => {
              // create archived file and write contents
              console.log('we made it');
              fs.open(exports.paths.archivedSites + '/' + url, 'w', (err, fd) => {
                if (err) {
                  console.error(err);
                } else {
                  fs.write(fd, file, (err) => {
                    if (err) {
                      console.error(err);
                    }
                  });
                }
              });
            });
            res.on('error', (err) => {
              console.log(err);
            });
          }
        });
      }
    });
    // make a get request to the url

  });
};
