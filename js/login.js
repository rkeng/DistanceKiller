$(function() {
   // get registered users
   let users;
   let families;
   if (sessionStorage.getItem('users')) {
      users = JSON.parse(sessionStorage.getItem('users'));
   } else {
		users = [
         {email: "ryan@ucsd.edu", code: "UCSD19", cred: {name: "Ryan", pwd: "123", avtr: 9, dob: "1996-12-06"}},
         {email: "joy@ucsd.edu", code: "UCSD19", cred: {name: "Joy", pwd: "123", avtr: 5, dob: "1997-7-27"}},
         {email: "ying@ucsd.edu", code: "UCSD19", cred: {name: "Ying", pwd: "123", avtr: 3, dob: "1996-10-15"}}
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
   if (!sessionStorage.getItem('posts')) {
      let posts = [
         {
            category:"work",
            content:"Working hard or hardly working?",
            imgData:"http://localhost:5500/post.html",
            date:"11/25/2018",
            owner:"ryan@ucsd.edu",
            name:"Ryan",
            position:{"lat":37.7749295,"lng":-122.41941550000001},
            location:"San Fransisco",
            uniqueId:"1543202264478ryan@ucsd.eduSanFransisco"
         },
         {
            category:"travel",
            content:"I want to visit this place someday!",
            imgData:"http://localhost:5500/post.html",
            date:"11/25/2018",
            owner:"ying@ucsd.edu",
            name:"Ying",
            position:{"lat":-33.8688197,"lng":151.20929550000005},
            location:"Sydney",
            uniqueId:"1543207290276ying@ucsd.eduSydney"
         },
         {
            category:"travel",
            content:"Good place to visit!",
            imgData:"http://localhost:5500/post.html",
            date:"11/25/2018",
            owner:"ryan@ucsd.edu",
            name:"Ryan",
            position:{"lat":41.878113,"lng":-87.629799},
            location:"Chicago",
            uniqueId:"1543202264478ryan@ucsd.eduChicago"
         },
         {
            category:"food",
            content:"Great food here!",
            imgData:"http://localhost:5500/post.html",
            date:"11/25/2018",
            owner:"ying@ucsd.edu",
            name:"Ying",
            position:{"lat":46.227638,"lng":2.213749},
            location:"France",
            uniqueId:"1543207290276ying@ucsd.eduFrance"
         },  
         {
            category:"fun",
            content:"Wow everything is so cheap",
            imgData:"http://localhost:5500/post.html",
            date:"11/25/2018",
            owner:"joy@ucsd.edu",
            name:"Joy",
            position:{"lat":25.0329636,"lng":121.56542680000007},
            location:"Taipei",
            uniqueId:"1543207512556joy@ucsd.eduTaipei"
         }
      ];
      sessionStorage.setItem('posts', JSON.stringify(posts));
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