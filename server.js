// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
httpServer.listen(8080);

function requestHandler(req, res) {
	// Read index.html
	fs.readFile(__dirname + '/index.html', 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(data);
  		}
  	);
}


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', 
	// We are given a websocket object in our function
	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		// When this user emits, client side: socket.emit('otherevent',some data);
		socket.on('chatmessage', function(data) {

			//Generate random number to determine what happens with data
			var randomEvent = Math.floor((Math.random() * 100) + 1)
			console.log(randomEvent);

			//35% chance of no transformation
			if(randomEvent <= 35) {
			}
			
			//30% chance of scrambling characters
			if(randomEvent > 35 && randomEvent <= 65) {
				var arr = [];
				var arrjoin;

				arr = data.split('');

				var currentIndex = arr.length, temporaryValue, randomIndex;

				while(0 !== currentIndex) {
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;
					temporaryValue = arr[currentIndex];
					arr[currentIndex] = arr[randomIndex];
					arr[randomIndex] = temporaryValue;
				}

				arrjoin = arr.join('');
				data = arrjoin;
			}

			//10% chance of tonedeaf statement or question
			if(randomEvent > 65 && randomEvent <= 75) {

				var stupid = ["i hear it's just like the movie Black Hawk Down", "Saving Private Ryan? I love that movie!", "I would have joined, I just don't like getting yelled at lol.", "I support the troops!", "They're just like real-life GI Joes!", "You've got PTSD? Stay the fuck away from me, man.", "Have you ever killed anyone?", "What's it like to kill someone?", "So they, like, brainwash you, right?", "Call of Duty is the best!", "I was in Boy Scouts. That's basically the same thing, right?", "The parades are great!", "Is you head alright after all those IUDs?", "It's, like, hot over there, right?", "Fuck yeah America!", "Is the PTSD contagious?"];
				var chooseStupid = Math.floor(Math.random() * 16);
				data = stupid[chooseStupid];
			}

			//10% chance of trauma care instructions
			if(randomEvent > 75 && randomEvent <= 85) {

				var medical = ["When treating an open abdominal wound, remember not to push protruding organs back into the body", "REMEBER: If a limb is completely amputated, the stump should be padded and bandaged", "If a tourniquet is applied, mark the casualty's forehead with a letter T and the time - using a pen, mud, the casualty's blood, or whatever is available.", "When dealing with a complete amputation, do not freeze the amputated part. Do not place the amputated part in view of the casualty", "When treating an open head wound, do not put unnecessary pressure on the skull or attempt to push brain matter back into the head", "DO NOT remove clothing in a chemical environment!", "Gas, gas, gas!"];
				var chooseMedical = Math.floor(Math.random() * 6);
				data = medical[chooseMedical];
			}

			//10% chance of link
			if(randomEvent > 85 && randomEvent <= 95) {

				var links = ['<a target="_blank" href="http://www.theatlantic.com/national/archive/2015/08/military-civilian-divide-some-positive-thoughts-from-the-military-side/400343/">Look at this</a>', '<a target="_blank" href="http://www.latimes.com/nation/la-na-warrior-main-20150524-story.html">Look at this</a>', '<a target="_blank" href="http://www.bridgingtgap.com/">This looks good</a>', '<a target="_blank" href="http://nation.time.com/2011/11/10/an-army-apart-the-widening-military-civilian-gap/">This looks good</a>', '<a target="_blank" href="http://time.com/3818170/military-stories/">Wanted to share this</a>', '<a target="_blank" href="http://taskandpurpose.com/unpacking-civilian-military-divide/">Wanted to share this</a>', '<a target="_blank" href="http://taskandpurpose.com/the-civilian-military-gap-is-more-of-a-drift-than-a-divide/">Hmmm...</a>', '<a target="_blank" href="https://gotyour6.org/">Good stuff here!</a>', '<a target="_blank" href="http://www.militarytimes.com/story/military/2015/03/21/veterans-natural-conversation-military-civilian-gap/25035857/">Hmmm...</a>', '<a target="_blank" href="https://www.washingtonpost.com/lifestyle/style/theres-a-divide-between-civilians-and-soldiers-hollywood-is-partly-to-blame/2015/05/17/ea1332f0-f819-11e4-a13c-193b1241d51a_story.html">This looks good</a>', '<a target="_blank" href="http://blogs.wsj.com/washwire/2015/05/25/on-memorial-day-a-proposal-to-bridge-the-civilian-military-divide/">Interesting</a>', '<a target="_blank" href="http://www.usnews.com/opinion/blogs/world-report/2013/05/31/two-ways-to-bridge-the-civilian-military-divide">Interesting</a>', '<a target="_blank" href="http://www.usnews.com/opinion/blogs/world-report/2013/11/11/understanding-the-civilian-military-divide-on-veterans-day">Look at this</a>', '<a target="_blank" href="http://www.huffingtonpost.com/colonel-david-w-sutherland/bridging-the-civilian-military-divide_b_6792952.html">Look at this</a>', '<a target="_blank" href="http://www.redstate.com/streiff/2015/05/24/liberal-angst-civil-military-divide-part-1000/">Agree?</a>'];
				var chooseLinks = Math.floor(Math.random() * 16);
				data = links[chooseLinks];
			}

			//5% chance of video
			if(randomEvent > 95 && randomEvent <= 100) {

				var video = ['<iframe width="420" height="315" src="https://www.youtube.com/embed/A5tRNs2X5Q4?iv_load_policy=3" frameborder="0" allowfullscreen></iframe>', '<iframe width="560" height="315" src="https://www.youtube.com/embed/oSWhIUiGang" frameborder="0" allowfullscreen></iframe>'];
				var chooseVideo = Math.floor(Math.random() * 3);
				data = video[chooseVideo];
			}

			io.sockets.emit('chatmessage', data);
		});
		
		
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);
