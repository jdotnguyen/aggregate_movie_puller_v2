//On document ready
$(document).ready(function() {
  startApp();
  search_manager.initSearchHandler();
  sidebar_manager.initSidebarHandlers();
  
  //On URL change, get listeners up
  window.addEventListener("hashchange", function () {
    startApp();
  });
});

//Start the app
function startApp() {
  //Parse URL to set state
  var url = window.location.href;
  var splitUrl = url.split('#');
  var urlCase = splitUrl[1];

  //Initialize view according to URL
  initView(splitUrl, urlCase);
};

//Initialize view
function initView(splitUrl, urlCase) {
  //Clear content
  $('#content-grid').empty().hide();

  //If length is 1 then load home, otherwise reconfigure
  if (splitUrl.length == 1) {
    window.location.href = "#now_playing";
  } else {
    var urlCaseArg = urlCase.split('=')[0];
    var urlArgs = urlCase.split('=')[1];
    switch(urlCaseArg) {
      case "now_playing":
      case "popular":
      case "top_rated":
      case "upcoming":
        //Sidebar styling
        $('.sidebar-navigation-link').removeClass('active');
        $('.sidebar-navigation-link[name="#' + urlCaseArg + '"]').addClass('active');
        card_manager.getAjax(urlCaseArg);
        break;
      case "movie_details":
        //Grab movie ID for ajax call
        var movie_id = urlArgs;

        movie_details_manager.movieDetailsAjax(movie_id);
        break;
      case "search_query":
        //Grab query and send to ajax
        var keywords = urlArgs;

        search_manager.searchAjax(keywords);
        break;
    }
  }
};