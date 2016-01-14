var socket = io();
$('#messages').append($('<li>').text('Welcome to this chat app! Type at the bottom of your screen!'));
//-------------------------------------------------
// Set the nick
var nick = localStorage.getItem('nick');

$('#nick-textbox').attr('placeholder' , nick || 'Nick');
if(nick) socket.emit('set nick', nick);

$('#nick').submit(function(){
	nick = $('#nick-textbox').val();
	console.log(nick);
	socket.emit('set nick', nick);
	localStorage.setItem('nick', nick);
	return false;
});

socket.on('set nick', function(nick){});
//-------------------------------------------------
// chatbox
$('#chatbox').submit(function(){
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	return false;
});

socket.on('chat message', function(msg){
	$('#messages').append($('<li>').text(msg));
});
//-------------------------------------------------
