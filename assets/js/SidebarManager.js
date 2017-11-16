function SidebarManager () {
	var _this = this;

	//Sidebar handlers
	this.initSidebarHandlers = function () {
	  	$('.sidebar-navigation-link').click(function(e) {
	  		e.preventDefault();
	  		//Styling
	  		$('.sidebar-navigation-link').removeClass('active');
	  		$(this).addClass('active');

	  		//Redirect for SPA
	  		window.location.href = $(this).attr('name');
	  	});
	};
}

var sidebar_manager = new SidebarManager();