console.log('Hello, the bot just woke up!');

var
	twt = require('twit'),
	config = require("./config");

var Twitter = new twt(config);

console.log(Twitter);

// Retweet #startrek
var retweet = function() {
	var params = {
		q: '#startrek, #startrekdsc, #startrekdiscovery',
		result_type: 'recent',
		lang: 'en'
	}

	Twitter.get('search/tweets'), params, function(err, data) {
		console.log('query data accpeted : ', data);
		console.log('searching...');
		// if no errors
		if (!err) {
			// grab ID of tweet to retweet
			var rtID = data.statuses[0].id_str;
			// Tell twitter to retweet
			Twitter.post('statuses/retweet/:id', {
				id: rtID
			}, function(err, response) {
				if (response) {
					console.log('Retweeted!');
				}

				if (err) {
					console.log('Retweet Error! see below: \n\n ' + err + '\n' );
				}
			});
		} else {
			console.log('Search Error! see below \n\n' + err + '\n');
		}
	}
}

retweet();
setInterval(retweet, 3000000);