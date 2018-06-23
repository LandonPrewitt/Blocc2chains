// Main.js

jQuery(function($){

	// Declare variables
	var socket = io.connect();
	var sendBtn = $('.send_message');
	var msg = $('.message_input');
	var msgList = $('.messages');

	// JQuery for sending messages
	$sendBtn.click(function(e){
		e.preventDefault();
		socket.emit('sendMsg', {msg: $msg.val()}, function(data){
			if(data.err != '') {
				console.log(data.err);
			} else {
				$msgList.append('<li>' + data.msg + '</li>');
				// $("#header ul").append('<li><a href="/user/messages"><span class="tab">Message Center</span></a></li>');
			}
		});
	});

});