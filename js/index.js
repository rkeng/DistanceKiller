$(function(){
   $('[data-toggle="tooltip"]').tooltip();
});

$('.avatar-minus').click(function(){
   $('.del-family').text($(this).data('id'));
});