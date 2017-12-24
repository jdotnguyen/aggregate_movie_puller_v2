function CastDetailsManager () {
	var _this = this;

	//Cast detail handler
	this.castDetailHandler = function (cid) {
	  	//Set URL param
	  	window.location.href = "#cast_details=" + cid;
	};

	//Populate Cast Details
	this.castDetailsAjax = function (type) {
		//Style header
  		$('.header-title').html("Cast Details");

	  	//Find out what type of call we're making
	  	var ajaxUrl = "https://api.themoviedb.org/3/person/" + type + "?api_key=7daac836cb57a577537d2d5ba0313dc8&language=en-US&page=1";

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
	      	},
	      	error: function(err) {
	          	alert(JSON.stringify(err));
	      	}
	  	});
	};	
};

var cast_details_manager = new CastDetailsManager();