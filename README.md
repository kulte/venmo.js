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