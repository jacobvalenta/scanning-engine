$(document).ready(function(){
	$("#scan-item").submit(function(e){
	    return false;
	});
	//var errorSound = new Audio("/static/snd/01.mp3");
	//var successSound = new Audio("/static/snd/02.mp3");
	var t = Date.now();
	var buffer = '';
	$(document).keypress(function(e){
		if ($('#id_item').is(":focus")){
			if(event.which == 13){
				$.ajax({
					type: "POST",
					url: $('#scan-item').attr('action'),
					data: $('#scan-item').serialize(),
				}).done(function( data ) {
					if (data.substr(0,5) == "ERROR"){
						//errorSound.play();
						errorHtml = '<div><img src="/static/img/icons/error.png" width="16" height="16" style="margin-right: 10px" />' + scanid + '</div>';
						notification(errorHtml);
						$('#errors').append(errorHtml);
					}else{
						//successSound.play();
						successHtml = '<div><img src="/static/img/icons/success.png" width="16" height="16" style="margin-right: 10px" />' + scanid + '</div>';
						notification(successHtml);
						$('#success').append(successHtml);
						$('li[data-iin="' + scanid.substr(1).replace(/(\r\n|\n|\r)/gm,"") + '"]').remove();
						$('#count').html( $("#items li").size().toString() );
					}
				});
				$('#id_item').val('');
			}
		}else{
			if (Date.now() - t > 20){
				buffer = '';
			}
			t = Date.now();
			buffer = buffer + String.fromCharCode(event.which);
			if(event.which == 13){
				$('#id_item').val( buffer.substr(1) );
				scanid = buffer;
				buffer = '';
				$.ajax({
					type: "POST",
					url: $('#scan-item').attr('action'),
					data: $('#scan-item').serialize(),
				}).done(function( data ) {
					if (data.substr(0,5) == "ERROR"){
						//errorSound.play();
						errorHtml = '<div><img src="/static/img/icons/error.png" width="16" height="16" style="margin-right: 10px" />' + scanid + '</div>';
						notification(errorHtml);
						$('#errors').append(errorHtml);
					}else{
						//successSound.play();
						successHtml = '<div><img src="/static/img/icons/success.png" width="16" height="16" style="margin-right: 10px" />' + scanid + '</div>';
						notification(successHtml);
						$('#success').append(successHtml);
						$('li[data-iin="' + scanid.substr(1).replace(/(\r\n|\n|\r)/gm,"") + '"]').remove();
						$('#count').html( $("#items li").size().toString() );
					}
				});
			}
		}
	});
});

function notification(text){
	$('#notification-area').append('<div class="notification">' + text + '</div>');
	$('.notification:last-child').delay(2000).fadeOut();
}