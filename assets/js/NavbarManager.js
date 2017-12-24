function NavbarManager () {
	var _this = this;

	//Sidebar handlers
	this.initNavbarHandlers = function () {
		//Logo
		$('.top-brand').click(function(e) {
			//Go back home
			window.location.href = '#now_playing';
		});

		//Sidebar navigation buttons
	  	$('.navigation-link').click(function(e) {
	  		e.preventDefault();
	  		//Styling
	  		$('.navigation-link').removeClass('active');
	  		$(this).addClass('active');

	  		//Redirect for SPA
	  		window.location.href = $(this).attr('name');
	  	});
	};
}

var navbar_manager = new NavbarManager();