$(function () {
   $('[data-toggle="tooltip"]').tooltip();

   // get loginStatus and set welcome text
   let loginStatus = JSON.parse(sessionStorage.getItem('loginStatus'));
   $('#welcome').text(function (i, oldText) {
      return oldText = oldText + ", " + loginStatus.user.cred.name;
   });

   let familyCode = loginStatus.user.code;
   $('#codeDisplay').text(familyCode);
	let dateBirth = loginStatus.user.dob;
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
	let fMemAvatar = [];
	let fMemProfilePic = [];
	let fMemBirthday = [];

	families.forEach(f => {
		if (f.code == familyCode) {
			fMemEmail = f.members;
		}
	});
	fMemEmail.forEach(m => {
		for(var i = 0; i < users.length; i++) {
			if(users[i].email == m) {
				fMemName.push(users[i].cred.name);
				fMemAvatar.push(users[i].cred.avtr);
				fMemProfilePic.push(users[i].cred.profilePic);
				fMemBirthday.push(users[i].cred.dob);
				break;
			}
		}
	})

	console.log(fMemBirthday);

	// merge names and emails
	let nameEmailPairs = {};
	for (let i = 0; i<fMemName.length; i++) {
		nameEmailPairs[fMemName[i]] = fMemEmail[i];
	}
	// merge names and avatars
	let emailAvatarPairs = {}
	for (let i = 0; i<fMemEmail.length; i++) {
		emailAvatarPairs[fMemEmail[i]] = fMemAvatar[i];
	}
	// merge names and profile pics
	let emailPicPairs = {}
	for (let i = 0; i<fMemEmail.length; i++) {
		emailPicPairs[fMemEmail[i]] = fMemProfilePic[i];
	}

	// merge names and birthdays
	let nameDobPairs = {};
	for (let i = 0; i<fMemName.length; i++) {
		nameDobPairs[fMemName[i]] = fMemBirthday[i];
	}

	if (loginStatus.user.cred.profilePic) {
		$('#curUser .avatar').append(
			'<img src="'+loginStatus.user.cred.profilePic+'" class="avatar-width">'
		);
	}
	else {
		$('#curUser .avatar').append(
			'<img src="./img/profile'+loginStatus.user.cred.avtr+'.png" class="avatar-width">'
		);
	}

	$('#curUser .avatar-name').text(loginStatus.user.cred.name);

	// display other family members' names and avatars
	fMemName.forEach(name => {
		if(name != loginStatus.user.cred.name) {
			$('#avatarBlock').append(
				'<div class="avatar-align text-center" id="'+nameEmailPairs[name]+'">'+
					'<span class="avatar-minus" data-id="'+nameEmailPairs[name]+'" data-name="'+name+'" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-minus-circle"></i></span>'+
					'<span class="avatar"></span><br>'+
					'<span class="avatar-name" dob="'+nameDobPairs[name]+'" email="'+nameEmailPairs[name]+'"data-name="'+name+'" data-toggle="modal" data-target="#profileModalCenter"><a href="#">'+name+'</a></span>'+
				'</div>');
		}
	})
	fMemEmail.forEach(email => {
		if (email != loginStatus.user.email) {
			let escape = '\\';
			let indexOfAt = email.indexOf('@');
			let indexOfDot = email.indexOf('.');
			let escapedStr = [email.slice(0, indexOfAt), escape, email.slice(indexOfAt, indexOfDot), escape, email.slice(indexOfDot)].join('');

			if (emailPicPairs[email]) {
				$('#'+escapedStr+' .avatar').append(
					'<img src="'+emailPicPairs[email]+'" class="avatar-width">'
				);
			}
			else {
				$('#'+escapedStr+' .avatar').append(
					'<img src="./img/profile'+emailAvatarPairs[email]+'.png" class="avatar-width">'
				);
			}
		}
	})

	let tgtFamMem;

	// family member profile modal
	$('.avatar-name').click(function(){
		$('.profile-name').text($(this).attr('data-name'));
		$('.profile-email').text($(this).attr('email'));
		$('.profile-dob').text($(this).attr('dob'));
	})

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
		users.forEach(u => {
			if (u.email == tgtFamMem) {
				u.code = generateCode();
				families.push({
					code: u.code,
					members: [u.email]
				});
			}
		})
		sessionStorage.setItem('families', JSON.stringify(families));
		sessionStorage.setItem('users', JSON.stringify(users));
	})
});

function removeFamMem(id) {
  var child = document.getElementById(id);
  child.parentNode.removeChild(child);
}