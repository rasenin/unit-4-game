var obiWan = {
  name: "Obi-Wan Kenobi",
  class: "obi-wan-kenobi",
  image: "assets/images/obi-wan-kenobi.jpeg",
  health: 120
}

var lukeSkywalker = {
  name: "Luke Skywalker",
  class: "luke-skywalker",
  image: "assets/images/luke-skywalker.jpg",
  health: 100
}

var darthSid = {
  name: "Darth Sidious",
  class: "darth-sidious",
  iamge: "assets/images/darth-sidious.png",
  health: 150
}

var darthMaul = {
  name: "Darth Maul",
  class: "darth-maul",
  image: "assets/images/darth-maul.jpg",
  health: 180
}

characters = [obiWan, lukeSkywalker, darthSid, darthMaul];

for (var i = 0; i < characters.length; i++) { // for each character

  // add their info to a div and append to the "choose-character" div

  var newDiv = $("<div>");

  newDiv.append("<h4>" + characters[i].name + "</h4>");
  newDiv.append("<img src=" + characters[i].image + " />");
  newDiv.append("<h4>" + characters[i].health + "</h4>");

  $(".choose-character").append(newDiv);
}
