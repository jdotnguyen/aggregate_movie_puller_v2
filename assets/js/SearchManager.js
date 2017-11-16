function SearchManager () {
	var _this = this;

	//Initial Search function
	this.initSearchHandler = function () {
	  	//Search input and button handlers
	  	$('#search').keyup(function (e) {_this.runSearch(e)});
		$('#searchbtn').click(function () {_this.runSearch()});
  	};

  	this.runSearch = function (e) {
  		//Get search input value
	    var keywords = $('#search').val();

	    //Only search when user presses enter
	    if (e.keyCode == 13) {
	    	window.location.href = "#search_query=" + keywords;
	    }
  	}

  	this.searchAjax = function (keywords) {
  		//If empty query then go back
  		if (keywords.length == 0) {
  			window.history.back();
  			return false;
  		}

  		//Style header
  		$('.header-title').html('Search');

  		//Populate search bar
  		$('#search').val(keywords);

  		//Get search parent template to add to main body
  		var templateParent = $('#search-parent-template').html();
  		var cloneParent = $(templateParent).clone();

      	//Update header
      	$(cloneParent).find('.search-results-keyword').html(keywords);

      	//Empty results list
      	$(cloneParent).find('.search-results-list').empty();

      	$('#content-grid').html(cloneParent);

      	$.ajax({
	      	url: "https://api.themoviedb.org/3/search/movie?api_key=7daac836cb57a577537d2d5ba0313dc8&query=" + keywords + "&page=1",
	      	contentType: "application/json",
	      	type: "GET",
	      	crossDomain: true,
	      	success: function(data) {
	          	//Get result data
	          	var results = data.results;

	         	$.each(results, function (i, v) {
		            //Get list item template then populate data into list
		            var template = $('#search-results-template').html();
		            var clone = $(template).clone();
		            var mid = this.id;

		            //Populate search data
		            $(clone).find('.search-results-movie-poster').attr('src', 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + this.poster_path);
		            $(clone).find('.search-results-movie-title').html(this.title);
		            $(clone).find('.search-results-movie-release-date').html(this.release_date);
		            $(clone).find('.search-results-movie-summary').html(this.overview);
		            $(clone).find('.search-results-movie-rating').html(this.vote_average);
		            $(clone).find('.search-results-list-item-title').html(this.original_title);

		            //Append to main body
		            $('#content-grid').append(clone).fadeIn();

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

var search_manager = new SearchManager();