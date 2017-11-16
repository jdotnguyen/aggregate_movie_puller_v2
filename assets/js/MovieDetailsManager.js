function MovieDetailsManager () {
	var _this = this;

	//Movie detail handler
	this.movieDetailHandler = function (mid) {
	  	//Set URL param
	  	window.location.href = "#movie_details=" + mid;
	};

	this.movieDetailsAjax = function (mid) {
	  	//Style header
	  	$('.header-title').html("Movie Details");

	  	//API call
	  	$.ajax({
		    url: "https://api.themoviedb.org/3/movie/" + mid + "?api_key=7daac836cb57a577537d2d5ba0313dc8&language=en-US",
		    contentType: "application/json",
		    type: "GET",
		    crossDomain: true,
		    success: function(data) {
		      	//Get list item template then populate data into list
		      	var template = $('#movie-details-template').html();
		      	var clone = $(template).clone();

		      	//Movie poster
		      	$(clone).find('.movie-details-poster').attr('src', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + data.poster_path);

		      	//Movie info
		      	$(clone).find('.movie-details-title').html(data.title);
		      	//Change rating colour depending on score
		      	switch(true) {
		        	case (data.vote_average < 4):
		          		$(clone).find('.movie-details-rating-btn').css('background-color', '#e74c3c');
		          		break;
		        	case (data.vote_average >= 4 && data.vote_average < 6):
		          		$(clone).find('.movie-details-rating-btn').css('background-color', '#f1c40f');
		          		break;
		        	case (data.vote_average >= 6 && data.vote_average <= 10):
		          		$(clone).find('.movie-details-rating-btn').css('background-color', '#2ecc71');
		          		break;
		      	}
		      	$(clone).find('.movie-details-rating').html(data.vote_average);
		      	$(clone).find('.movie-details-release-date').html(data.release_date.split('-')[0]);
		      	$(clone).find('.movie-details-overview').html(data.overview);
		      	$.each(data.genres, function () {
		        	var template2 = $('#movie-details-genre-template').html();
		        	var clone2 = $(template2).clone();

		        	$(clone2).find('.movie-details-genre-chip').html(this.name);
		        	$(clone).find('.movie-details-genres').append(clone2);
		      	});

		      	//Studio Info
		      	$(clone).find('.movie-details-studio-budget').html('$' + data.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		      	$.each(data.production_companies, function () {
		        	$(clone).find('.movie-details-studio-companies').append(this.name + '<br>');
		      	});
		      	$.each(data.production_countries, function () {
		        	$(clone).find('.movie-details-studio-countries').append(this.name + '<br>');
		      	});
		      	$.each(data.spoken_languages, function () {
		        	$(clone).find('.movie-details-studio-languages').append(this.name + '<br>');
		      	});

		      	$('#content-grid').html(clone).fadeIn();

		      	//
		      	$.ajax({
		        	url: "https://api.themoviedb.org/3/movie/" + mid + "/credits?api_key=7daac836cb57a577537d2d5ba0313dc8&language=en-US",
		        	contentType: "application/json",
		        	type: "GET",
		        	crossDomain: true,
		        	success: function(data) {
			          	//Get each type of cast
			          	var crew = data.crew;
			          	var cast = data.cast;

			          	//Populate them accordingly
			          	$.each(crew, function () {
			            	// console.log(this);
			          	});
		        	},
		        	error: function(err) {
		            	alert(JSON.stringify(err));
		        	}
		      	});
		    },
		    error: function(err) {
		        alert(JSON.stringify(err));
		    }
	  	});
	}	
};

var movie_details_manager = new MovieDetailsManager();