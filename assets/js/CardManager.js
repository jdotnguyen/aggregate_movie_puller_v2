function CardManager () {
	var _this = this;

	//Populate Now Playing
	this.getAjax = function (type) {
		//Style header
  		$('.header-title').html($('.sidebar-navigation-link.active').html());

	  	//Find out what type of call we're making
	  	var ajaxUrl = "https://api.themoviedb.org/3/movie/" + type + "?api_key=7daac836cb57a577537d2d5ba0313dc8&language=en-US&page=1";

	  	//API call
	  	$.ajax({
	      	url: ajaxUrl,
	      	contentType: "application/json",
	      	type: "GET",
	      	crossDomain: true,
	      	success: function(data) {
	        	//Grab only the movies
	        	var movies = data.results;

	        	//Populate and show each movie
	        	$.each(movies, function (i) {
	          		//Get template and turn into HTML
	          		var template = $('#movie-card-template').html();
	          		var clone = $(template).clone();
	          		var mid = this.id;

	          		//Populate data
	          		$(clone).find('.movie-card-title').html(this.original_title);
	          		$(clone).find('.movie-poster').attr('src', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + this.poster_path);
	          		$(clone).find('.movie-summary').html(this.overview);
	          		$(clone).find('.movie-rating').html(this.vote_average);
	          		$(clone).find('.movie-release-date').html(this.release_date);

	          		//Shove HTML data onto content area
	          		$('#content-grid').append(clone).fadeIn();

	          		$(clone).click(function() {
	            		movie_details_manager.movieDetailHandler(mid);
	          		});
	        	});
	      	},
	      	error: function(err) {
	          	alert(JSON.stringify(err));
	      	}
	  	});
	};	
};

var card_manager = new CardManager();