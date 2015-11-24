// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'EmqLeMgkUWeoPfQoeuV1zg',
  consumer_secret: 'vHy5UTulUyMF5H37yZs5XeNTC_g',
  token: 'v5CmZ1Xd9-8sQMVoQV6l8tKVOAaDmjKm',
  token_secret: 'BisfuztfkNd1C_POONpknPoMB2k',
});

module.exports = yelp;
