$(function(){
	var startStopButton = $('.btn.start');
	$(startStopButton).click(function(){
		$(this).toggleClass('start').toggleClass('stop');
		if ($(this).text() === 'Start Processing'){
			$(this).text('Stop Processsing');
			EXECUTIVE.start();
		} else {
			$(this).text('Start Processing');
			EXECUTIVE.stop();
		}
	});
});