function CompanyManager () {
	var _this = this;

	//Company handler
	this.companyHandler = function (cid) {
	  	//Set URL param
	  	window.location.href = "#company_details=" + cid;
  	};

  	//Populate company details
  	this.companyAjax = function (cid) {
      	$.ajax({
	      	url: "https://api.themoviedb.org/3/company/" + cid + "/movies?api_key=7daac836cb57a577537d2d5ba0313dc8&language=en-US",
	      	contentType: "application/json",
	      	type: "GET",
	      	crossDomain: true,
	      	success: function(data) {
	          	//Get result data
	          	var results = data.results;

	         	$.each(results, function (i, v) {
		            //Get list item template then populate data into list
		            var template = $('#company-results-template').html();
		            var clone = $(template).clone();
		            var mid = this.id;

		            //Populate company data
		            $(clone).find('.company-results-movie-poster').attr('src', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + this.poster_path);
		            $(clone).find('.company-results-movie-title').html(this.title);
		            $(clone).find('.company-results-movie-release-date').html(this.release_date);
		            $(clone).find('.company-results-movie-summary').html(this.overview);
		            $(clone).find('.company-results-movie-rating').html(this.vote_average);
		            $(clone).find('.company-results-list-item-title').html(this.original_title);

		            //Style header
			  		$('.header-title').html('Similar movies by company');

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

var company_manager = new CompanyManager();