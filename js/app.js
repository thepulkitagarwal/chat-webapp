var socket = io();
$('#messages').append($('<li>').text('Welcome to this chat app! Type at the bottom of your screen. Press Enter to send.'));
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
	if(nick) {
		var msg = {
			'nick': nick,
			'text': $('#m').val()
		};
		socket.emit('chat message', msg);
		$('#m').val('');
	}
	else {
		alert("Enter Nick First!");
	}
	return false;
});

socket.on('chat message', function(msg){
	var displayText = msg.text;
	if(msg.nick) displayText = msg.nick + ': ' + msg.text;
	if(msg.timestamp) {
		var date = new Date(msg.timestamp);
		displayText = '[' + getTimeFromDate(date) + '] '+ displayText;
	}
	// alert(displayText);
	$('#messages').append($('<li>').text(displayText));
});
//-------------------------------------------------
// returns a string from a given date
function getTimeFromDate(date) {
	function addZero(i) {
		return i < 10 ? '0' + i : i;
	}
	var h = addZero(date.getHours());
	var m = addZero(date.getMinutes());
	var s = addZero(date.getSeconds());
	return h + ":" + m + ":" + s;
}
