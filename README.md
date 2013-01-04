venmo.js
========

venmo.js is a Venmo library for node.js, currently supporting the Payment Links API and the Venmo Application API. Future builds will support the Reciepts API and provide convenince functions for you to recieve and unsign responses to your callback url from the Venmo servers. 

Installing
----------

To install venmo.js from npm

    npm install venmo

or include it in your `package.json` file

    "dependencies": {
        "venmo": "0.0.1"
    }

Payment Links API
-----------------

The Payment Links API is a simple interface for generating urls to serve as the entry point to make a Venmo payment or charge. Using it with venmo.js is quite straightforward. First, you'll need to register your app with Venmo. Then, start creating payment links:

    var Venmo = require('venmo')
      , venmo = new Venmo(client_id, client_secret)

    var object = {
        user: 'Zachary-Friedman'
      , amount: 1000
    };

    venmo.pay(object, function (error, link) {
      if (error) {
        console.log(error);
      } else {
        console.log(link) # => https://venmo.com/Zachary-Friedman?txn=payment&amount=1000
      }
    });

Application API
---------------

The Application API is a slick interface from Venmo to associate emails, phone numbers, Facebook accounts, Foursquare accounts and Twitter accounts with Venmo users. The most general interface provided by venmo.js is the top-level, batch `#find()` function. Your instance of the Venmo object calls the function with an object that can contain any combination of the following parameters, each of which accepts a comma-separated list of values:

| Parameter            | Examples                          |
| -------------------- | --------------------------------- |
| emails               | zafriedman@gmail.com, foo@bar.com |
| phone_numbers        | 1234567890, 15555555555           |
| facebook_ids         | 123, 456, 789                     |
| foursquare_ids       | 123, 456, 789                     |
| twitter_screen_names | _kulte, aplusk, BarackObama       |

So if you'd like to make a payment, but you don't know the individual's Venmo username, you can do this:

    var object = {
        "twitter_screen_names": "BarackObama"
    };

    venmo.find(object, function (error, results) {
      if (error) { console.log(error); } else {
        console.log(results); # => [{ username: 'barackonvenmo', twitter_screen_name: 'BarackObama' }]
        var query = {
            user: _.first(results).username /* _.first is a function from the wonderful underscore.js library */
          , amount: 2000
          , note: 'for automatic tax hikes"
        };

        venmo.pay(query, function (error, url) {
          if (error) { console.log(error); } else {
            console.log(url); # => https://venmo.com/barackonvenmo?txn=pay&amount=2000&note=for+automatic+tax+hikes
            /**
            * You can do many slick things with this url. You can redirect to it in an endpoint in an Express app,
            * you can respond with it as part of a JSON API with res.json(url) or do something else entirely.
            */
          }
        });
      }
    });
