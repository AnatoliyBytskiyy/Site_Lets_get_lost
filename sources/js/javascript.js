(function($){
	$(window).scroll(function() {
	    $('.header__hill').css('top', ($(this).scrollTop()/3+40)+'px');
	    $('.text_scroll').css('top', $(this).scrollTop()+'px');
	});

	$(function(){
		$( "#date" ).datepicker();
		$( "#date2" ).datepicker();
	});
})(jQuery);