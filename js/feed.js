function Feed(label, text, location, owner,time) {
  this.label = label;
  this.text = text;
  this.location = location;
  this.owner = owner;
  this.time = time;
}

var feeds, i;
var feed1 = new Feed("Work", "Super frustrated today...", "DistanceKiller co.", "Joy","10/03/2018 20:45pm");
var feed2 = new Feed("Food", "I don't think it is a good restaurant, not recommended", "Chipotle @ Genesee Ave.", "Joy","10/03/2018 22:45pm");
var feed3 = new Feed("Travel", "I want to visit here, mom and dad", "France", "Ying","11/03/2018 20:22pm");
var feed4 = new Feed("Fun", "Playing my favorite spiderman game!!", "Ryan's sweet home", "Ryan","11/07/2018 20:07pm");
feeds = [feed1,feed2,feed3,feed4];

for (var i = 0; i < feeds.length; i++) {
  var newCard = document.createElement("div");
  newCard.className = "col-sm-6";
  var feedId = "feed" + new String(feeds[i].location) + new String(feeds[i].label)+ "-card";
  newCard.setAttribute("id", feedId);
  var newCardHTML = '<div class="bootstrap-overrides">'
      + '<div class="card">'
      + '<div class="card-header">';
      if (feeds[i].label == "Food") {
        newCardHTML += '<div class="food" id="' + feedId + '>Food</div>';
      }
      else if (feeds[i].label == "Travel"){
        newCardHTML += '<div class="travel" id="' + feedId + '>Travel</div>'
        +'<div class="travel" id="' + feedId + '>Travel</div>';
      }
      else if (feeds[i].label == "Work"){
        newCardHTML += '<div class="work" id="' + feedId + '>Work</div>';
      }
      else{
        newCardHTML += '<div class="fun" id="' + feedId + '>Fun</div>';
      }

      newCardHTML += '<div class="feed-loc" id="feed' + feeds[i].location + '-loc">' + feeds[i].location + '</div>'
      + '</div>'
      + '<div class="card-body">'
      + '<h5 class="card-title" id="feed' + feedId+ '-owner">' + feeds[i].owner + '</h5>'
      + '<hr>'
      + '<p class="card-text" id="' + feedId + '-text">' + feeds[i].text + '</p>'
      + '<div class="text-right" style="padding-bottom:10px; padding-top:10px">'
      + '<div class="card-text" id="' + feedId + '-time">' + feeds[i].time + '</p>' 
      + '<button class="btn btn-outline-success" type= "button"' + feedId + " >Like this feed</button >";

      if(feeds[i].owner == "Joy"){
        newCardHTML += '<button class="btn btn-outline-warning" style="padding-left:10px" type= "button"' + feedId + " > Delete feed</button >"
      }

  newCard.innerHTML = newCardHTML;
  var parent = document.getElementById("feedSection");
  parent.appendChild(newCard);
}

// function scrollIt(element) {
//   window.scrollTo({
//       'behavior': 'smooth',
//       'left': 0,
//       'top': element.offsetTop
//   });
// }

// var btns = document.querySelectorAll('.upperbutton');
// var sections = document.querySelectorAll('#feedSections');

// btns[0].addEventListener("click", () => {
//   scrollIt(sections[1]);
// }, false);

// btns[1].addEventListener('click', () => {
//   scrollIt(sections[2]);
// });

// btns[2].addEventListener('click', () => {
//   scrollIt(sections[0]);
// });

// btns[3].addEventListener('click', () => {
//   scrollIt(sections[0]);
// });
