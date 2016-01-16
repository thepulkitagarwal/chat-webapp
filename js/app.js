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
		stopOnSubmitText(); // For voice recognition
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
	$('#messages').append($('<li>').text(displayText));
	scrollToBottom();
});

function scrollToBottom(radius){
	radius = radius || 100;

	if($(window).scrollTop() + $(window).height() > $(document).height() - radius) {
		$(document).scrollTop($(document).height());
	}
}
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
//-------------------------------------------------

var finalTextMessage = '';
var isRecognizing = false;
 
if ('webkitSpeechRecognition' in window) {
 
  var recognition = new webkitSpeechRecognition();
 
  recognition.continuous = true;
  recognition.interimResults = true;
 
  recognition.onstart = function() {
    isRecognizing = true;
  };
 
  recognition.onerror = function(event) {
    console.log(event.error);
  };
 
  recognition.onend = function() {
    isRecognizing = false;
  };
 
  recognition.onresult = function(event) {
    var interimText = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTextMessage += event.results[i][0].transcript;
      } else {
        interimText += event.results[i][0].transcript;
      }
    }
    finalTextMessage = capitalize(finalTextMessage);
    document.getElementById('m').value = linebreak(finalTextMessage) + linebreak(interimText);
    
  };
}
 
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
 
function capitalize(s) {
  var firstChar = /\S/;
  return s.replace(firstChar, function(m) { return m.toUpperCase(); });
}
 
function toggleDictation(event) {
  if (isRecognizing) {
    recognition.stop();
    return;
  }
  finalTextMessage = '';
  recognition.lang = 'en-IN';
  $('#m').focus();
  recognition.start();
  // alert('a');
}

function stopOnSubmitText() {
	recognition.stop();
	finalTextMessage = '';
}

$('#mic').click(toggleDictation);