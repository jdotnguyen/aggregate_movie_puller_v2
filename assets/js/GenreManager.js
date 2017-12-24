function GenreManager () {
	var _this = this;

	//Genre handler
	this.genreHandler = function (gid) {
	  	//Set URL param
	  	window.location.href = "#genre_details=" + gid;
  	};

  	//Populate genre details
  	this.genreAjax = function (gid) {
      	$.ajax({
	      	url: "https://api.themoviedb.org/3/discover/movie?api_key=7daac836cb57a577537d2d5ba0313dc8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" + gid,
	      	contentType: "application/json",
	      	type: "GET",
	      	crossDomain: true,
	      	success: function(data) {
	          	//Get result data
	          	var results = data.results;

	         	$.each(results, function (i, v) {
		            //Get list item template then populate data into list
		            var template = $('#genre-results-template').html();
		            var clone = $(template).clone();
		            var mid = this.id;

		            //Populate genre data
		            $(clone).find('.genre-results-movie-poster').attr('src', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + this.poster_path);
		            $(clone).find('.genre-results-movie-title').html(this.title);
		            $(clone).find('.genre-results-movie-release-date').html(this.release_date);
		            $(clone).find('.genre-results-movie-summary').html(this.overview);
		            $(clone).find('.genre-results-movie-rating').html(this.vote_average);
		            $(clone).find('.genre-results-list-item-title').html(this.original_title);

		            //Style header
			  		$('.header-title').html('Similar movies by genre');

		            //Append to main body
		            $('#content-grid').append(clone).fadeIn('fast');

		            //Add a click handler to each of the result templates
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

var genre_manager = new GenreManager();