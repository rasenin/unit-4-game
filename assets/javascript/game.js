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
  image: "assets/images/darth-sidious.png",
  health: 150
}

var darthMaul = {
  name: "Darth Maul",
  class: "darth-maul",
  image: "assets/images/darth-maul.jpg",
  health: 180
}

var originalCharacters = [obiWan, lukeSkywalker, darthSid, darthMaul];

// keep track of the state of the game
var plyrCharacterChosen = false;
var enemyChosen = false;
var needToClick = true;

function displayCharacters(divname, characters) {
  for (var i = 0; i < characters.length; i++) {
    var newDiv = $("<div>");

    newDiv.append("<h4>" + characters[i].name + "</h4>");
    newDiv.append("<img src=" + characters[i].image + " alt=\"" + characters[i].name + "\" />");
    newDiv.append("<h4>" + characters[i].health + "</h4>");

    if (needToClick) {
      newDiv.addClass("character click-character");
      newDiv.attr("pos", i); // potential bug: the array will differ at different stages of the game, might need 3rd arg
    } else {
      newDiv.addClass("character");
    }    

    if (plyrCharacterChosen && !enemyChosen) {
      newDiv.addClass("enemy");
    }

    $(divname).append(newDiv);
  }
}

displayCharacters(".choose-character", originalCharacters);

$(".click-character").on("click", function() { // when a character is clicked
  if (!plyrCharacterChosen) {
    $(".choose-character").empty();

    var clickedCharacter = $(this).attr("pos");

    needToClick = false;
    displayCharacters(".your-character", [originalCharacters[clickedCharacter]]);
    needToClick = true;

    // get the enemies: all the characters that are not the one who was clicked
    var enemies = [];
    $.each(originalCharacters, function(index, character) {
      if (parseInt(index) !== parseInt(clickedCharacter)) {
        // console.log(index);
        enemies.push(character);
      }

    });
    
    plyrCharacterChosen = true;
    displayCharacters(".enemies", enemies);
  }
});
