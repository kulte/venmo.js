/**
* Module dependencies.
*/

var request = require('superagent')
  , _ = require('underscore')
  , BASE_URL = 'https://venmo.com/';

/**
* Module exports.
*/

module.exports = Venmo;

/**
* Venmo client.
*/

function Venmo (client_id, client_secret) {
  this.client_id = client_id;
  this.client_secret = client_secret;
}

/**
* Pay function.
*
* @param {Object} query
* @param {Function} callback
* @api public
*/

Venmo.prototype.pay = function (query, callback) {
  var url;

  if (!query.user) {
    return callback(new Error('Error thrown by venmo.js: You are required to specify a user to submit a payment.'));
  } 
  if (!query.amount) {
    return callback(new Error('Error thrown by venmo.js: You are required to specify an amount to submit a payment.'));
  }

  url = BASE_URL + query.user + '?txn=pay&amount=' + query.amount;

  if (query.note) {
    url += '&note=' + query.note.replace(/ /g,"+");
  }
  if (query.share) {
    var share = '';

    if (!(_.contains(query.share, 'Venmo') || _.contains(query.share, 'Facebook') || _.contains(query.share, 'Twitter'))) {
      return callback(new Error('Error thrown by venmo.js: Invalid sharing options. Valid options are \'Venmo\', \'Facebook\' and \'Twitter\'.'));
    } else {
      if (_.contains(query.share, 'Venmo')) {
        share += 'v';
      }
      if (_.contains(query.share, 'Facebook')) {
        share += 'f';
      }
      if (_.contains(query.share, 'Twitter')) {
        share += 't';
      }
    }

    if ((_.contains(share, 'f') || _.contains(share, 't') && !_.contains(share, 'v'))) {
      share += 'v';
    }
    url += '&share=' + share;
  }
  if (query.recipients) {
    url += '&recipients=' + query.recipients;
  }

  return callback(null, url);
}

/**
* Charge function.
*
* @param {Object} query
* @param {Function} callback
* @api public
*/

Venmo.prototype.charge = function (query, callback) {
  var url;

  if (!query.user) {
    return callback(new Error('Error thrown by venmo.js: You are required to specify a user to submit a payment.'));
  } 
  if (!query.amount) {
    return callback(new Error('Error thrown by venmo.js: You are required to specify an amount to submit a payment.'));
  }

  url = BASE_URL + query.user + '?txn=pay&amount=' + query.amount;

  if (query.note) {
    url += '&note=' + query.note.replace(/ /g,"_");
  }
  if (query.share) {
    var share = '';

    if (!(_.contains(query.share, 'Venmo') || _.contains(query.share, 'Facebook') || _.contains(query.share, 'Twitter'))) {
      callback(new Error('Error thrown by venmo.js: Invalid sharing options. Valid options are \'Venmo\', \'Facebook\' and \'Twitter\'.'));
    } else {
      if (_.contains(query.share, 'Venmo')) {
        share += 'v';
      }
      if (_.contains(query.share, 'Facebook')) {
        share += 'f';
      }
      if (_.contains(query.share, 'Twitter')) {
        share += 't';
      }
    }

    if ((_.contains(share, 'f') || _.contains(share, 't') && !_.contains(share, 'v'))) {
      share += 'v';
    }
    url += '&share=' + share;
  }
  if (query.recipients) {
    url += '&recipients=' + query.recipients;
  }

  return callback(null, url);
}

/**
* Find function.
*
* @param {Object} query
* @param {Function} callback
* @api public
*/

Venmo.prototype.find = function (query, callback) {
  var url = BASE_URL + 'api/v2/user/find'
    , data = {};

  if (query.emails) {
    _.extend(data, { emails: query.emails });
  }
  if (query.phone_numbers) {
    _.extend(data, { phone_numbers: query.phone_numbers });
  }
  if (query.facebook_ids) {
    _.extend(data, { facebook_ids: query.facebook_ids });
  }
  if (query.foursquare_ids) {
    _.extend(data, { foursquare_ids: query.foursquare_ids });
  }
  if (query.twitter_screen_names) {
    _.extend(data, { twitter_screen_names: query.twitter_screen_names });
  }

  request.get(url)
    .query(_.extend({ client_id: this.client_id, client_secret: this.client_secret }, data))
    .end(function (res) {
      if (res.body && _.isArray(res.body.data)) {
        return callback(null, res.body.data);
      } else {
        callback(new Error('Error thrown by venmo.js: Bad venmo response.'));
      }
    });
}

/**
* Find by email convenience function.
*
* @param {String} email
* @param {Function} callback
* @api public
*/

Venmo.prototype.findByEmail = function (email, callback) {
  request.get(BASE_URL + 'api/v2/user/find')
    .query(_.extend({ client_id: this.client_id, client_secret: this.client_secret }, { emails: email }))
    .end(function (res) {
      if (res.body && _.isArray(res.body.data)) {
        return callback(null, _.first(res.body.data));
      } else {
        callback(new Error('Error thrown by venmo.js: Bad venmo response. Check to make sure you are passing a valid email address for a user signed up with Venmo.'));
      }
    });
}

/**
* Find by phone number convenience function.
*
* @param {Number} phone
* @param {Function} callback
* @api public
*/

Venmo.prototype.findByPhoneNumber = function (phone, callback) {
  request.get(BASE_URL + 'api/v2/user/find')
    .query(_.extend({ client_id: this.client_id, client_secret: this.client_secret }, { phone_numbers: phone }))
    .end(function (res) {
      if (res.body && _.isArray(res.body.data)) {
        return callback(null, _.first(res.body.data));
      } else {
        callback(new Error('Error thrown by venmo.js: Bad venmo response. Check to make sure you are passing a valid phone number for a user signed up with Venmo.'));
      }
    });
}

/**
* Find by Facebook ID convenience function.
*
* @param {Number} facebook_id
* @param {Function} callback
* @api public
*/

Venmo.prototype.findByFacebookId = function (facebook_id, callback) {
  request.get(BASE_URL + 'api/v2/user/find')
    .query(_.extend({ client_id: this.client_id, client_secret: this.client_secret }, { facebook_ids: facebook_id }))
    .end(function (res) {
      if (res.body && _.isArray(res.body.data)) {
        return callback(null, _.first(res.body.data));
      } else {
        callback(new Error('Error thrown by venmo.js: Bad venmo response. Check to make sure you are passing a valid Facebook ID for a user signed up with Venmo.'));
      }
    });
}

/**
* Find by Foursquare ID convenience function.
*
* @param {Number} foursquare_id
* @param {Function} callback
* @api public
*/

Venmo.prototype.findByFoursquareId = function (foursquare_id, callback) {
  request.get(BASE_URL + 'api/v2/user/find')
    .query(_.extend({ client_id: this.client_id, client_secret: this.client_secret }, { foursquare_ids: foursquare_id }))
    .end(function (res) {
      if (res.body && _.isArray(res.body.data)) {
        return callback(null, _.first(res.body.data));
      } else {
        callback(new Error('Error thrown by venmo.js: Bad venmo response. Check to make sure you are passing a valid Foursquare ID for a user signed up with Venmo.'));
      }
    });
}

/**
* Find by Twitter convenience function.
*
* @param {String} twitter_name
* @param {Function} callback
* @api public
*/

Venmo.prototype.findByTwitter = function (twitter_name, callback) {
  request.get(BASE_URL + 'api/v2/user/find')
    .query(_.extend({ client_id: this.client_id, client_secret: this.client_secret }, { twitter_screen_names: twitter_name }))
    .end(function (res) {
      if (res.body && _.isArray(res.body.data)) {
        return callback(null, _.first(res.body.data));
      } else {
        callback(new Error('Error thrown by venmo.js: Bad venmo response. Check to make sure you are passing a valid Twitter for a user signed up with Venmo.'));
      }
    });
}
