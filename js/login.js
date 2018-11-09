$(function() {
   // get registered users
   let users;
   if (sessionStorage.getItem('users')) {
      users = JSON.parse(sessionStorage.getItem('users'));
   } else {
      users = [];
   }

   // get loginStatus
   let loginStatus;
   if (sessionStorage.getItem('loginStatus')) {
      loginStatus = JSON.parse(sessionStorage.getItem('loginStatus'));
   } else {
      loginStatus = {
         user: null
      }
   }

   $('#loginBtn').click(function () {

      event.preventDefault(); // prevent PageReLoad

      let ValidEmail = false;
      let ValidPassword = false;

      // check if email is registered
      users.forEach(user => {
         if (user.email === $('#emailInput').val()) {
            ValidEmail = true;
            if (user.cred.pwd === $('#passwordInput').val()) {
               ValidPassword = true;
               loginStatus.user = user;
            }
         }
      });

      if (ValidEmail === true && ValidPassword === true) { // if ValidEmail & ValidPassword
         sessionStorage.setItem('loginStatus', JSON.stringify(loginStatus));
         window.location = "./";
      }
      else {
         $('#loginError').removeClass('invisible').addClass('visible'); // show error msg
      }
   });
});