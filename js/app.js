var socket = io();

//-------------------------------------------------
// Set the nick
var nick = localStorage.getItem('nick');

$('#nick-textbox').attr('placeholder' , nick || 'Nick');
if(nick) socket.emit('set nick', nick);

$('#nick-submit').submit(function(){
	nick = $('#nick-textbox').val();
	socket.emit('set nick', nick);
	localStorage.setItem('nick', nick);
	return false;
});

//-------------------------------------------------

$('#chatbox').submit(function(){
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	return false;
});

socket.on('chat message', function(msg){
	$('#messages').append($('<li>').text(msg));
});