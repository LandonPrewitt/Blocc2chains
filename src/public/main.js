// Main.js

jQuery(function($){

	// Declare variables
	var socket = io.connect();
	var $sendBtn = $('#send_message');
	var $msg = $('.message_input');
	var $msgList = $('.messages');
	var $title = $('.title');

	// Functions
	function sendMessage() {
		socket.emit('sendMsg', {msg: $msg.val()}, function(data){
			if(data.err != '') {
				console.log('hello world 1.0');
				console.log(data.err);
			} else {
				console.log('message sent to server');
				// $("#header ul").append('<li><a href="/user/messages"><span class="tab">Message Center</span></a></li>');
			}
		});
	}

	// JQuery for sending messages
	$sendBtn.click(function(e){
		e.preventDefault();	
		sendMessage();	
	});

	$($msg).keyup(function (e){
		e.preventDefault();
		if(e.which ==13) {
			sendMessage();
			$msg.val("");
		}
	})

	socket.on('newMsg', function(data) {
		$msgList.append('<li>' + data + '</li>');
	});

	socket.on('updateUserCount', function(data) {
		$title.text("Chat - " + data + " Online");
	});


});