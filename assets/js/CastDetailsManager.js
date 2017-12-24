function CastDetailsManager () {
	var _this = this;

	//Cast detail handler
	this.castDetailHandler = function (cid) {
	  	//Set URL param
	  	window.location.href = "#cast_details=" + cid;
	};

	//Populate Cast Details
	this.castDetailsAjax = function (pid) {
		//Style header
  		$('.header-title').html("Cast Details");

	  	//Find out what type of call we're making
	  	var ajaxUrl = "https://api.themoviedb.org/3/person/" + pid + "?api_key=7daac836cb57a577537d2d5ba0313dc8&language=en-US&page=1";

	  	//API call
	  	$.ajax({
	      	url: ajaxUrl,
	      	contentType: "application/json",
	      	type: "GET",
	      	crossDomain: true,
	      	success: function(data) {
	        	//Grab cast data
	        	var results = data;

	        	//Get template and turn into HTML
          		var template = $('#cast-details-template').html();
          		var clone = $(template).clone();
          		var cid = results.id;

          		//Populate data
          		$(clone).find('.cast-details-title').html(results.name);
          		$(clone).find('.cast-details-poster').attr('src', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + results.profile_path);
          		$(clone).find('.cast-details-biography').html(results.biography);
          		$(clone).find('.cast-details-birthday').html(results.birthday);
          		$(clone).find('.cast-details-birthplace').html(results.place_of_birth);

          		//Define genders
          		var gender = "";
          		switch(results.gender) {
          			case 1:
          				gender = "Female";
          				break;
          			case 2:
          				gender = "Male";
          				break;
          		}
          		$(clone).find('.cast-details-sex').html(gender);

          		//Populate aliases
          		var aliases = results.also_known_as
          		$.each(aliases, function (i, v) {
          			$(clone).find('.cast-details-aliases').append(v + '<br>');
          		});

          		//Shove HTML data onto content area
          		$('#content-grid').append(clone).fadeIn('fast');

          		//Add click handler to each of these templates
          		$(clone).click(function() {
            		movie_details_manager.movieDetailHandler(mid);
          		});

          		//Get known movies ajax
		      	$.ajax({
		      		url: "https://api.themoviedb.org/3/person/" + pid + "/movie_credits?api_key=7daac836cb57a577537d2d5ba0313dc8&language=en-US",
		        	contentType: "application/json",
		        	type: "GET",
		        	crossDomain: true,
		        	success: function(data) {
			          	//Get each similar movie
			          	var results = data.cast;

			          	//Pop in each similar movie entry
			          	$.each(results, function (i, v) {
			          		var movie_details_known_for_template = $('#cast-details-known-for-template').html();
			          		var movie_details_known_for_template_clone = $(movie_details_known_for_template).clone();
			          		var mid = this.id;

			          		//Populate movie poster and title into template
			          		$(movie_details_known_for_template_clone).find('.movie-poster').attr('src', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + this.poster_path);
			          		$(movie_details_known_for_template_clone).find('.cast-details-known-for-movie-title').html(this.title);

			          		//Append to main body
			          		$(clone).find('.movie-details-known-for-list').append(movie_details_known_for_template_clone);

			          		//Click handler for each of similar movie
			          		$(movie_details_known_for_template_clone).click(function () {
			          			movie_details_manager.movieDetailHandler(mid);
			          		});

			          		//Only show top 8
			          		if (i == 5) {
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
	};	
};

var cast_details_manager = new CastDetailsManager();