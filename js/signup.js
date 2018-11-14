$(function() {
   let users;
   let families;

   if (sessionStorage.getItem('users')) {
      users = JSON.parse(sessionStorage.getItem('users'));
   } else {
      users = [];
   }

   if (sessionStorage.getItem('families')) {
      families = JSON.parse(sessionStorage.getItem('families'));
   } else {
      families = [
         {code: "ABC123", members:["jdoe@ucsd.edu"]}
      ];
   }

   $('#signupBtn').click(function () {
      event.preventDefault(); // prevent PageReLoad

      let invalidInput = false;

      // check if fields are all filled in
      let signupEmail = $('#signup-email').val();
      let signupName = $('#signup-fmlyr').val();
      let signupPwd = $('#signup-password').val();
      let signupConfirmPwd = $('#signup-confirm-password').val();
      let signupFamilyCode = $('#signup-fmlycode').val();

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

      // family code
      if (!signupFamilyCode) {
         // if no input for family code, generate a unique code
         signupFamilyCode = generateCode();

         let familyInstance = {
            code: signupFamilyCode,
            members: [signupEmail]
         }

         families.push(familyInstance);
         sessionStorage.setItem('families', JSON.stringify(families));

      } else {
         let codeFound = false;
         families.forEach(f => {
            if (f.code == signupFamilyCode) {
               // add user to family if code exists
               codeFound = true;
               f.members.push(signupEmail);
               sessionStorage.setItem('families', JSON.stringify(families));
            }
         });
         // return immediately if code does not exist
         if (!codeFound) {
            alert("Family code invalid.");
            return;
         }
      }

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
         code: signupFamilyCode,
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

// random family code generator
let letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
let numbers = '0123456789'.split('');
let codePool = letters.concat(numbers);

function generateCode() {
      let code = "";
      for(let i=0; i<6; i++) {
         code += codePool[Math.floor(Math.random()*codePool.length)]
      }
   return code;
}