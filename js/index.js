$(function(){
   $('[data-toggle="tooltip"]').tooltip();
});

$('.avatar-minus').click(function(){
   $('.del-family').text($(this).data('id'));
});

$('.img-click').click(function(){
   $('#hide-image').attr('src', $(this).attr('src'));
   $('#hide-image').attr('style', "display:true");
});