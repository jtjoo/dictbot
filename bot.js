console.log('Hello, the bot just woke up!');

var
	twt = require('twit'),
	config = require("./config");

var Twitter = new twt(config.auth);
var wd = require("word-definition");

// console.log(Twitter);

var getHashtags = function() {
	var hashtags = config.hashtags;
	var str = "";
	var i = 0;
	for (let hs of hashtags) {
		str += hs;
		if ( ++i < hashtags.length ) str += ", "
	}
	return str;
}

// Retweet #startrek
var retweet = function() {

    let hashtags = getHashtags();

	let params = {
		q: "#startrek",
		result_type: 'recent',
		count: 2,
		lang: 'en'
	}

	console.log( '\nretweet function called for :', hashtags );

	Twitter.get('search/tweets', params, function(err, data) {
		console.log(data);
		// console.log('searching...');
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
	});
}

// console.log(getHashtags());
retweet();
setInterval(retweet, 3000000);

// get Mentions from Stream
var mentions = function() {

	var stream = Twitter.stream('user');
	stream.on('tweet', function(data) {

		let username = data.user.screen_name;
		let msg = data.text;

		// 단어를 찾는가?
		let word = new RegExp(/([\w]+) 뜻/i);
		let found = word.exec(msg);
		if ( found ) {
			console.log(found[1]);
			// console.log("S(H)e wants me to find word definition of ",word);
			language = "en";
			wd.getDef(found[1], language, null, function(def) {
				// console.log(def.word + ": " + def.definition + " @" + username);
				Twitter.post('statuses/update', {
					status: def.word + ": " + def.definition + " @" + username
				});
				console.log("Replied word definition!")
			});
		}

	});
}

mentions();
setInterval(mentions, 30000);
