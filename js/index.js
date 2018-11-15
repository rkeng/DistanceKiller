$(function () {
   $('[data-toggle="tooltip"]').tooltip();

   // get loginStatus and set welcome text
   let loginStatus = JSON.parse(sessionStorage.getItem('loginStatus'));
   $('#welcome').text(function (i, oldText) {
      return oldText = oldText + ", " + loginStatus.user.cred.name;
   });

   let familyCode = loginStatus.user.code;
   $('#codeDisplay').text(familyCode);

   let users;
   let families;

   if (sessionStorage.getItem('users')) {
      users = JSON.parse(sessionStorage.getItem('users'));
   }
   if (sessionStorage.getItem('families')) {
      families = JSON.parse(sessionStorage.getItem('families'));
	}
	
	let fMemEmail = [];
	let fMemName = [];

	families.forEach(f => {
		if (f.code == familyCode) {
			fMemEmail = f.members;
		}
	});
	fMemEmail.forEach(m => {
		for(var i = 0; i < users.length; i++) {
			if(users[i].email == m) {
				fMemName.push(users[i].cred.name);
				break;
			}
		}
	})

	console.log(fMemName);

	let nameEmailPairs = {};
	// merge names and emails
	for (let i = 0; i<fMemName.length; i++) {
		nameEmailPairs[fMemName[i]] = fMemEmail[i];
	}

	$('#curUser .avatar-name').text(loginStatus.user.cred.name);
	fMemName.forEach(name => {
		if(name != loginStatus.user.cred.name) {
			$('#avatarBlock').append(
				'<div class="avatar-align text-center" id="'+nameEmailPairs[name]+'">'+
					'<span class="avatar-minus" data-id="'+nameEmailPairs[name]+'" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-minus-circle"></i></span>'+
					'<span class="avatar"><i class="fas fa-6x fa-user-circle"></i></span><br>'+
					'<span class="avatar-name">'+name+'</span>'+
				'</div>');
		}
	})
});

function removeFamMem(id) {
  console.log(id)
  var child = document.getElementById(id);
  console.log(id);
  child.parentNode.removeChild(child);
}