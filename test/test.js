var assert = require('assert')
  , Venmo = require('../venmo');

/**
* venmo.findByEmail("zafriedman@gmail.com", function (error, results) { console.log(results); });
* venmo.findByPhoneNumber(8182920209, function (error, results) { console.log(results); });
* venmo.findByFacebookId(8645350, function (error, results) { console.log(results); });
* venmo.findByFoursquareId(9972790, function (error, results) { console.log(results); });
* venmo.findByTwitter("_kulte", function (error, results) { console.log(results); });
*/

describe('Venmo', function () {
  var venmo = new Venmo(1204, "QhgJFBDxXrq2ZvXBWqKLdAeZjAZJCNkX");

  describe('client_id', function () {
    it('should assign client_id when passed to the constructor', function () {
       assert.equal(1204, venmo.client_id);
    })  
  })

  describe('client_secret', function () {
    it('should assign client_secret when passed to the constructor', function () {
      assert.equal("QhgJFBDxXrq2ZvXBWqKLdAeZjAZJCNkX", venmo.client_secret);
    })
  })

  describe('#pay()', function () {
    it('should generate a proper payment url', function () {
      var object = {
        user: 'Zachary-Friedman'
      , amount: 100
      }
      var VALID_URL = 'https://venmo.com/Zachary-Friedman?txn=pay&amount=100'

      venmo.pay(object, function (error, url) {
        if (error) {
          assert(false);
        } else {
          assert.equal(url, VALID_URL);
        }
      });
    })
    it('should accept a note property', function () {
      var object = {
        user: 'Zachary-Friedman'
      , amount: 100
      , note: 'for testing venmo.js'
      }
      var VALID_URL = 'https://venmo.com/Zachary-Friedman?txn=pay&amount=100&note=for+testing+venmo.js'

      venmo.pay(object, function (error, url) {
        if (error) {
          assert(false);
        } else {
          assert.equal(url, VALID_URL);
        }
      });
    })
    it('should accept a share property', function () {
      var object = {
        user: 'Zachary-Friedman'
      , amount: 100
      , share: ["Venmo"]
      }
      var VALID_URL = 'https://venmo.com/Zachary-Friedman?txn=pay&amount=100&share=v'

      venmo.pay(object, function (error, url) {
        if (error) {
          assert(false);
        } else {
          assert.equal(url, VALID_URL);
        }
      });
    })
    it('should append \'Venmo\' when it is not included with other valid share array elements', function () {
      var object = {
        user: 'Zachary-Friedman'
      , amount: 100
      , share: ["Facebook", "Twitter"]
      }
      var VALID_URL = 'https://venmo.com/Zachary-Friedman?txn=pay&amount=100&share=ftv'

      venmo.pay(object, function (error, url) {
        if (error) {
          assert(false);
        } else {
          assert.equal(url, VALID_URL);
        }
      });
    })
    it('should throw an error when passed an invalid share property', function () {
      var object = {
        user: 'Zachary-Friedman'
      , amount: 100
      , share: ["Google+"]
      }

      venmo.pay(object, function (error, url) {
        if (error) {
          assert(true);
        } else {
          assert(false);
        }
      });
    })
    it('should accept multiple recipients', function () {}) 
  })

  describe('#charge()', function () {
    it('should generate a proper payment url', function () {
      var object = {
        user: 'Zachary-Friedman'
      , amount: 100
      }
      var VALID_URL = 'https://venmo.com/Zachary-Friedman?txn=charge&amount=100'

      venmo.charge(object, function (error, url) {
        if (error) {
          assert(false);
        } else {
          assert.equal(url, VALID_URL);
        }
      });
    })
    it('should accept a note property', function () {})
    it('should accept a share property', function () {})
    it('should accept multiple recipients', function () {}) 
  })

  describe('#find()', function () {
  })
})
