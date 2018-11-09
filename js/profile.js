$(function () {
   $('#logoffBtn').click(function () {
      sessionStorage.removeItem('loginStatus');
      location.href = "./login.html";
   })
});

$('.img-click').click(function () {
   $('#hide-image').attr('src', $(this).attr('src'));
   $('#hide-image').attr('style', "display:true");
});