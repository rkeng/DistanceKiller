$(function() {
   let users;

   if (sessionStorage.getItem('users')) {
      users = JSON.parse(sessionStorage.getItem('users'));
   } else {
      users = [];
   }

   $('#signupBtn').click(function () {
      event.preventDefault(); // prevent PageReLoad

      let invalidInput = false;

      // check if fields are all filled in
      let signupEmail = $('#signup-email').val();
      let signupName = $('#signup-fmlyr').val();
      let signupPwd = $('#signup-password').val();
      let signupConfirmPwd = $('#signup-confirm-password').val();

      if (!signupEmail || !signupName || !signupPwd || !signupConfirmPwd) {
         alert("Please fill in all required fields.");
         invalidInput = true;
      }
      if (invalidInput) return;

      // check if password and password confirmation are equal
      if (signupPwd !== signupConfirmPwd) {
         alert("Password and Password Confirmation do not match.");
         invalidInput = true;
      }
      if (invalidInput) return;

      // check if email is registered
      users.forEach(user => {
         if (user.email === signupEmail) {
            alert("This email has been taken. Please register with a different email.");
            invalidInput = true;
         }
      });
      if (invalidInput) return;

      let user = {
         email: signupEmail,
         cred: {
            name: signupName,
            pwd: signupPwd
         }
      }

      users.push(user);
      sessionStorage.setItem('users', JSON.stringify(users));

      window.location = "./login.html";
   });
});