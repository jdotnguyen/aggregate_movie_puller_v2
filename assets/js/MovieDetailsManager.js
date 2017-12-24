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
		      	var movie_details_template = $('#movie-details-template').html();
		      	var movie_details_template_clone = $(movie_details_template).clone();

		      	//Movie poster
		      	$(movie_details_template_clone).find('.movie-details-poster').attr('src', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + data.poster_path);

		      	//Movie info
		      	$(movie_details_template_clone).find('.movie-details-title').html(data.title);
		      	//Change rating colour depending on score
		      	switch(true) {
		        	case (data.vote_average < 4):
		          		$(movie_details_template_clone).find('.movie-details-rating').css('background-color', '#E35313');
		          		break;
		        	case (data.vote_average >= 4 && data.vote_average < 6):
		          		$(movie_details_template_clone).find('.movie-details-rating').css('background-color', '#FEB524');
		          		break;
		        	case (data.vote_average >= 6 && data.vote_average <= 10):
		          		$(movie_details_template_clone).find('.movie-details-rating').css('background-color', '#3AB449');
		          		break;
		      	}
		      	$(movie_details_template_clone).find('.movie-details-rating').html(data.vote_average);
		      	$(movie_details_template_clone).find('.movie-details-release-date').html(data.release_date.split('-')[0]);
		      	$(movie_details_template_clone).find('.movie-details-overview').html(data.overview);
		      	$.each(data.genres, function () {
		        	var movie_details_genre_template = $('#movie-details-genre-template').html();
		        	var movie_details_genre_template_clone = $(movie_details_genre_template).clone();
		        	var gid = this.id;

		        	$(movie_details_genre_template_clone).find('.movie-details-genre-chip').html(this.name).attr('id', gid);
		        	$(movie_details_template_clone).find('.movie-details-genres').append(movie_details_genre_template_clone);

		        	//Add click handler for each genre
		        	$(movie_details_genre_template_clone).click(function () {
		        		genre_manager.genreHandler(gid);
		        	});
		      	});

		      	//Studio Info
		      	//Parse runtime
		      	var hours = Math.floor(data.runtime/60);
		      	var minutes = data.runtime % 60;
		      	$(movie_details_template_clone).find('.movie-details-studio-runtime').html(hours + 'h ' + minutes + 'm');
		      	$(movie_details_template_clone).find('.movie-details-studio-budget').html('$' + data.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		      	$.each(data.production_companies, function () {
		      		var movie_details_company_template = $('#movie-details-company-template').html();
		      		var movie_details_company_template_clone = $(movie_details_company_template).clone();
		      		var cid = this.id;

		      		$(movie_details_company_template_clone).find('.movie-details-company-chip').html(this.name).attr('id', cid);
		        	$(movie_details_template_clone).find('.movie-details-studio-companies').append(movie_details_company_template_clone);

		        	//Add click handler for each genre
		        	$(movie_details_company_template_clone).click(function () {
		        		company_manager.companyHandler(cid);
		        	});
		      	});
		      	$.each(data.production_countries, function () {
		        	$(movie_details_template_clone).find('.movie-details-studio-countries').append(this.name + '<br>');
		      	});
		      	$.each(data.spoken_languages, function () {
		        	$(movie_details_template_clone).find('.movie-details-studio-languages').append(this.name + '<br>');
		      	});

		      	$('#content-grid').html(movie_details_template_clone).fadeIn('fast');

		      	//Get cast ajax
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

			          	$.each(cast, function (i, v) {
			          		var movie_details_cast_template = $('#movie-details-cast-template').html();
			          		var movie_details_cast_template_clone = $(movie_details_cast_template).clone();
			          		var cid = this.id;

			          		//Populate data
			          		$(movie_details_cast_template_clone).find('.movie-details-cast-image').attr('src', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + this.profile_path);
			          		$(movie_details_cast_template_clone).find('.movie-details-cast-real-name').html(this.name);
			          		$(movie_details_cast_template_clone).find('.movie-details-cast-character-name').html(this.character);

			          		//Append to main body
			          		$(movie_details_template_clone).find('.movie-details-cast-body').append(movie_details_cast_template_clone);

			          		//Add click handler for each cast member
			          		$(movie_details_cast_template_clone).click(function () {
			          			cast_details_manager.castDetailHandler(cid);
			          		});

			          		//Only show top 6
			          		if (i == 5) {
			          			return false;
			          		}
			          	});
		        	},
		        	error: function(err) {
		            	alert(JSON.stringify(err));
		        	}
		      	});

		      	//Get video ajax
		      	$.ajax({
		      		url: "https://api.themoviedb.org/3/movie/" + mid + "/videos?api_key=7daac836cb57a577537d2d5ba0313dc8&language=en-US",
		        	contentType: "application/json",
		        	type: "GET",
		        	crossDomain: true,
		        	success: function(data) {
			          	//Get each type of cast
			          	var results = data.results;

			          	//Pop in YouTube iframes
			          	$.each(results, function (i, v) {
			          		var movie_details_video_template = $('#movie-details-video-template').html();
			          		var movie_details_video_template_clone = $(movie_details_video_template).clone();

			          		//Change the embed URL in each YouTube iframe
			          		$(movie_details_video_template_clone).find('iframe').attr('src', 'https://www.youtube.com/embed/' + this.key);

			          		//Append to main body
			          		$(movie_details_template_clone).find('.movie-details-trailers-body').append(movie_details_video_template_clone);
			          	});
		        	},
		        	error: function(err) {
		            	alert(JSON.stringify(err));
		        	}
		      	});

		      	//Get similar movies ajax
		      	$.ajax({
		      		url: "https://api.themoviedb.org/3/movie/" + mid + "/similar?api_key=7daac836cb57a577537d2d5ba0313dc8&language=en-US",
		        	contentType: "application/json",
		        	type: "GET",
		        	crossDomain: true,
		        	success: function(data) {
			          	//Get each similar movie
			          	var results = data.results;

			          	//Pop in each similar movie entry
			          	$.each(results, function (i, v) {
			          		var movie_details_similar_movies_template = $('#movie-details-similar-movies-template').html();
			          		var movie_details_similar_movies_template_clone = $(movie_details_similar_movies_template).clone();
			          		var mid = this.id;

			          		//Populate movie poster and title into template
			          		$(movie_details_similar_movies_template_clone).find('.movie-poster').attr('src', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + this.poster_path);
			          		$(movie_details_similar_movies_template_clone).find('.movie-details-similar-movie-title').html(this.title);

			          		//Append to main body
			          		$(movie_details_template_clone).find('.movie-details-similar-movies-list').append(movie_details_similar_movies_template_clone);

			          		//Click handler for each of similar movie
			          		$(movie_details_similar_movies_template_clone).click(function () {
			          			movie_details_manager.movieDetailHandler(mid);
			          		});

			          		//Only show top 8
			          		if (i == 7) {
			          			return false;
			          		}
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