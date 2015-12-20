$(".write-nav-button").click(function(event) {
  $(".write-container").show();
  $(".comments-container").hide();
  $(".search-container").hide();
  $(".write-nav-button").addClass("active");
  $(".comments-nav-button").removeClass("active");
  $(".search-nav-button").removeClass("active");
});

$(".comments-nav-button").click(function(event) {
  $(".write-container").hide();
  $(".comments-container").show();
  $(".search-container").hide();
  $(".write-nav-button").removeClass("active");
  $(".comments-nav-button").addClass("active");
  $(".search-nav-button").removeClass("active");
});

$(".search-nav-button").click(function(event) {
  $(".write-container").hide();
  $(".comments-container").hide();
  $(".search-container").show();
  $(".write-nav-button").removeClass("active");
  $(".comments-nav-button").removeClass("active");
  $(".search-nav-button").addClass("active");
});

// 里面的函数会在页面载入结束之后运行，这样包着的话就不用考虑顺序
$(document).ready(function() {
  // 打开页面之后直接点一下这个按钮，把初始状态补上
  $(".comments-nav-button").click();
});

function lookUpMovie(movieName, callbackFunction) {
  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "GET",
    dataType: "json",
    data: {
      s: movieName
    },
    success: callbackFunction
  });
}

function createSearchResult(result) {
  var $newResult = $("<div></div>");
  $newResult.addClass("row col-md-6 search-result");

  var $leftContainer = $("<div></div>");
  $leftContainer.addClass("col-xs-6");

  var $rightContainer = $("<div></div>");
  $rightContainer.addClass("col-xs-6");

  var $moviePoster = $("<img />");
  $moviePoster.addClass("search-result-poster");
  if (result.Poster !== "N/A") {
    $moviePoster.attr("src", result.Poster);
  }

  var $movieTitle = $("<p></p>");
  $movieTitle.addClass("search-result-title");
  $movieTitle.text(result.Title);

  var $movieYear = $("<span></span>");
  $movieYear.addClass("search-result-year");
  $movieYear.text("(" + result.Year + ")");

  var $imdbLink = $("<a></a>");
  $imdbLink.addClass("search-result-link");
  $imdbLink.attr("href", "http://www.imdb.com/title/" + result.imdbID);
  $imdbLink.text("去IMDB");

  var $writeLink = $("<a></a>");
  $writeLink.addClass("search-result-link write-link");
  $writeLink.text("写影评");
  $writeLink.data("imdbID", result.imdbID);

  $movieTitle.append($movieYear);
  $leftContainer.append($moviePoster);
  $rightContainer.append($movieTitle);
  $rightContainer.append($imdbLink);
  $rightContainer.append($writeLink);
  $newResult.append($leftContainer);
  $newResult.append($rightContainer);

  return $newResult;
}

function setUpWriteLinks() {
  $(".write-link").click(function() {
    // 把电影编号输入到写影评的页面上
    $(".imdb-input").val($(this).data("imdbID")).trigger("change");
    // 转移到写影评的地方
    $(".write-nav-button").click();
  });
}

$(".search-button").click(function(event) {
  // 先把上次搜索的结果清空
  $(".search-results-container").html("");
  // 把搜索文本框的信息存到movieName里
  var movieName = $(".search-text-input").val();
  $(".search-results-prompt").text("你要搜的电影是：" + movieName);
  lookUpMovie(movieName, function(data, status, xhr) {
    var searchResults = data.Search;

    for (var i = 0; i < searchResults.length; i++) {
      var result = searchResults[i];
      var searchResultElement = createSearchResult(result);
      $(".search-results-container").append(searchResultElement);
    }

    setUpWriteLinks();
  });
});

$(".imdb-input").change(function() {
  var imdbID = $(".imdb-input").val();
  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "GET",
    dataType: "json",
    data: {
      i: imdbID,
      plot: "full"
    },
    success: function(data, status, xhr) {
      $(".movie-info").html("");
      var movieInfoElement = createSearchResult(data);
      $(".movie-info").append(movieInfoElement);
    }
  });
});
