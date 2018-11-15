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
   } else {
		users = [
         {email: "ryan@ucsd.edu", code: "UCSD19", cred: {name: "Ryan", pwd: "123", dob: "1996-12-06"}},
         {email: "joy@ucsd.edu", code: "UCSD19", cred: {name: "Joy", pwd: "123"}},
         {email: "ying@ucsd.edu", code: "UCSD19", cred: {name: "Ying", pwd: "123"}}
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
					'<span class="avatar-minus" data-id="'+nameEmailPairs[name]+'" data-name="'+name+'" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-minus-circle"></i></span>'+
					'<span class="avatar"><i class="fas fa-6x fa-user-circle"></i></span><br>'+
					'<span class="avatar-name">'+name+'</span>'+
				'</div>');
		}
	})

	let tgtFamMem;
	// delete family member modal
	$('.avatar-minus').click(function(){
		$('.del-family').text($(this).attr('data-name'));
		tgtFamMem = $(this).attr('data-id');
	})
	// delete family member confirm
	$('#confirmRemove').click(function(){
		removeFamMem(tgtFamMem);
		families.forEach(f => {
			if (f.code == familyCode) {
				let index = f.members.indexOf(tgtFamMem);
				if (index !== -1) f.members.splice(index, 1);
			}
		});
		sessionStorage.setItem('families', JSON.stringify(families));
		users.forEach(u => {
			if (u.email == tgtFamMem) {
				u.code = generateCode();
			}
		})
		sessionStorage.setItem('users', JSON.stringify(users));
	})
});

function removeFamMem(id) {
  var child = document.getElementById(id);
  child.parentNode.removeChild(child);
}