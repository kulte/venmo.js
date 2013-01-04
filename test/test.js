var assert = require('assert')
  , Venmo = require('../venmo')
  , venmo = new Venmo(1204, "QhgJFBDxXrq2ZvXBWqKLdAeZjAZJCNkX")
  , query = { user: "Zachary-Friedman", amount: 100, note: "for+testing+venmo.js" };

/**
* venmo.pay(query, function (error, url) { console.log(url); });
*
* venmo.findByEmail("zafriedman@gmail.com", function (error, results) { console.log(results); });
* venmo.findByPhoneNumber(8182920209, function (error, results) { console.log(results); });
* venmo.findByFacebookId(8645350, function (error, results) { console.log(results); });
* venmo.findByFoursquareId(9972790, function (error, results) { console.log(results); });
* venmo.findByTwitter("_kulte", function (error, results) { console.log(results); });
*/

describe('Venmo', function () {
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
    it('should throw an error if there is no user specified', function () {})
    it('should throw an error if there is no amount specified', function () {})
    it('should generate a proper payment url', function () {})
    it('should accept a note property', function () {})
    it('should accept a share property', function () {})
    it('should accept multiple recipients', function () {}) 
  })

  describe('#charge()', function () {
    it('should throw an error if there is no user specified', function () {})
    it('should throw an error if there is no amount specified', function () {})
    it('should generate a proper payment url', function () {})
    it('should accept a note property', function () {})
    it('should accept a share property', function () {})
    it('should accept multiple recipients', function () {}) 
  })
})
