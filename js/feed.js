function Feed(label, text, location, owner, time) {
  this.label = label;
  this.text = text;
  this.location = location;
  this.owner = owner;
  this.time = time;
}

var feeds;
if (sessionStorage.getItem('posts')) {
  feeds = JSON.parse(sessionStorage.getItem('posts'));

  // var feed1 = new Feed("Work", "Super frustrated today...", "DistanceKiller co.", "Joy","10/03/2018 20:45pm");
  // var feed2 = new Feed("Food", "I don't think it is a good restaurant, not recommended", "Chipotle @ Genesee Ave.", "Joy","10/03/2018 22:45pm");
  // var feed3 = new Feed("Travel", "I want to visit here, mom and dad", "France", "Ying","11/03/2018 20:22pm");
  // var feed4 = new Feed("Fun", "Playing my favorite spiderman game!!", "Ryan's sweet home", "Ryan","11/07/2018 20:07pm");
  // feeds = [feed1,feed2,feed3,feed4];

  for (var i = 0; i < feeds.length; i++) {
    var newCard = document.createElement("div");
    newCard.className = "col-sm-6";
    var feedId = feeds[i].uniqueId;
    newCard.setAttribute("id", feedId);
    var newCardHTML = '<div class="bootstrap-overrides">'
      + '<div class="card">'
      + '<div class="card-header">';
    if (feeds[i].category == "food") {
      newCardHTML += '<div class="food" id="' + feedId + '">Food</div>';
    }
    else if (feeds[i].category == "travel") {
      newCardHTML += '<div class="travel" id="' + feedId + '">Travel</div>';
    }
    else if (feeds[i].category == "work") {
      newCardHTML += '<div class="work" id="' + feedId + '">Work</div>';
    }
    else {
      newCardHTML += '<div class="fun" id="' + feedId + '">Fun</div>';
    }

    newCardHTML += '<div class="feed-loc" id="feed' + feeds[i].location + '-loc">' + feeds[i].location + '</div>'
      + '</div>'
      + '<div class="card-body">'
      + '<h5 class="card-title" id="feed' + feedId + '-owner">' + feeds[i].name + '</h5>'
      + '<hr>'
      + '<p class="card-text" id="' + feedId + '-text">' + feeds[i].content + '</p>';

    if (!feeds[i].imgData.endsWith("post.html")) newCardHTML += '<img class="img-fluid" src="' + feeds[i].imgData + '" alt="Post Image">';

    newCardHTML += '<div class="text-right" style="padding-bottom:10px; padding-top:10px">'
      + '<div class="card-text" id="' + feedId + '-time">' + feeds[i].date + '</div>'
      + '</div>';
    // + '<button class="btn btn-outline-success" style="margin-right:3px" type= "button"' + feedId + " >Like feed</button >";

    console.log(sessionStorage.getItem('loginStatus'));
    if (feeds[i].owner == JSON.parse(sessionStorage.getItem('loginStatus')).user.email) {
      newCardHTML += '<button class="btn btn-outline-danger" data-toggle="modal" data-id="'+feedId+'" data-target="#exampleModalCenter">Delete Post</button>';
    }

    newCard.innerHTML = newCardHTML;
    var parent = document.getElementById("feedSection");
    parent.appendChild(newCard);
  }
}

// Delete feed
function deleteFeed(id) {
  var child = document.getElementById(id);
  child.parentNode.removeChild(child);
  feeds = feeds.filter(function (el) { return el.uniqueId != id; });
  sessionStorage.setItem('posts', JSON.stringify(feeds));
}
// Delete feed confirmation
let tgtPost;
$(".btn-outline-danger").click(function(){
  tgtPost = $(this).attr('data-id');
})
$("#confirmDelete").click(function(){
  deleteFeed(tgtPost);
})

var btns = document.getElementsByClassName("btn-dark");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("btn btn-dark active");
    current[0].classList.remove("active");
    this.classList.add("active");
  });
}