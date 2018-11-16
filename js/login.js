$(function() {
   // get registered users
   let users;
   let families;
   if (sessionStorage.getItem('users')) {
      users = JSON.parse(sessionStorage.getItem('users'));
   } else {
		users = [
         {email: "ryan@ucsd.edu", code: "UCSD19", cred: {name: "Ryan", pwd: "123", avtr: 9, dob: "1996-12-06"}},
         {email: "joy@ucsd.edu", code: "UCSD19", cred: {name: "Joy", pwd: "123", avtr: 5}},
         {email: "ying@ucsd.edu", code: "UCSD19", cred: {name: "Ying", pwd: "123", avtr: 3}}
		];
		sessionStorage.setItem('users', JSON.stringify(users));
   }
   if (sessionStorage.getItem('families')) {
      families = JSON.parse(sessionStorage.getItem('families'));
   } else {
      families = [
         {code: "UCSD19", members:["ryan@ucsd.edu", "joy@ucsd.edu", "ying@ucsd.edu"]}
      ];
      sessionStorage.setItem('families', JSON.stringify(families));
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