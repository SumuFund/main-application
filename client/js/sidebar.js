Template.sidebar.rendered = function() {
	setTimeout(function(){$('.sidebar').css('height', '100%').css('opacity', 1);}, 1000);
	$('.sidebar .tableau-link').hide();
}