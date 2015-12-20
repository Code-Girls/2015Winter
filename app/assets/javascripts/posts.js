$(".write-nav-button").click(function(event) {
  $(".write-container").show();
  $(".comments-container").hide();
  $(".write-nav-button").addClass("active");
  $(".comments-nav-button").removeClass("active");
});

$(".comments-nav-button").click(function(event) {
  $(".write-container").hide();
  $(".comments-container").show();
  $(".write-nav-button").removeClass("active");
  $(".comments-nav-button").addClass("active");
});

// 打开页面之后直接点一下这个按钮，把初始状态补上
$(".comments-nav-button").click();
