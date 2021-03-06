// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var CronJob = require('../node_modules/cron/lib/cron').CronJob;

var archive = require('../helpers/archive-helpers');

new CronJob('* * * * *', () => {
  archive.readListOfUrls(function(urls) {
    archive.downloadUrls(urls);
  });
}, null, true, 'America/Los_Angeles');

