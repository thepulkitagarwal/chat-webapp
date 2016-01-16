var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	// res.send('<h1>Hello World</h1>');
	res.sendFile(__dirname + '/index.html');
});

app.get('/js/app.js', function(req, res){
	res.sendFile(__dirname + '/js/app.js');
});

app.get('/js/bootstrap.min.js', function(req, res){
	res.sendFile(__dirname + '/js/bootstrap.min.js');
});

app.get('/styles/app.css', function(req, res){
	res.sendFile(__dirname + '/styles/app.css');
});

app.get('/styles/bootstrap.min.css', function(req, res){
	res.sendFile(__dirname + '/styles/bootstrap.min.css');
});

app.get('/js/jquery.min.js', function(req, res){
	res.sendFile(__dirname + '/js/jquery.min.js');
});

io.on('connection', function(socket){
	// console.log('a user connected');
	// io.emit('chat message', 'Welcome to this chat app! Type at the bottom of your screen!');

	socket.on('disconnect', function(){

	});

	socket.on('chat message', function(msg){
		msg.timestamp = new Date();
		io.emit('chat message', msg);
	});

	socket.on('set nick', function(nick){
		var timestamp = new Date();
		io.emit('chat message', {
			'text': nick + ' is online',
			'timestamp': timestamp
		});
	});
});

http.listen(4000, function(){
	console.log('listening on *:4000');
});