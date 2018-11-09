$(function () {
   $('[data-toggle="tooltip"]').tooltip();

   // get loginStatus and set welcome text
   let loginStatus = JSON.parse(sessionStorage.getItem('loginStatus'));
   $('#welcome').text(function (i, oldText) {
      return oldText = oldText + ", " + loginStatus.user.cred.name;
   });
});

function removeFamMem(id) {
  console.log(id)
  var child = document.getElementById(id);
  console.log(id);
  child.parentNode.removeChild(child);
}