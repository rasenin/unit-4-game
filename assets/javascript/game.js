$(document).ready(function() {
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
  var enemies = [];
  
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
        if (!plyrCharacterChosen) {
          newDiv.addClass("character character-user");
        } else {
          newDiv.addClass("character character-enemy");
        }        
        newDiv.attr("pos", i); // potential bug: the array will differ at different stages of the game, might need 3rd arg
      } else {
        newDiv.addClass("character");
      }

      $(divname).append(newDiv);
    }
  }
  
  displayCharacters(".choose-character", originalCharacters);
  
  $(".character-user").on("click", function() { // when user selects character
  
    console.log("You clicked a character!");
  
    var clickedCharacter = $(this).attr("pos");
  
    needToClick = false;
    displayCharacters(".your-character", [originalCharacters[clickedCharacter]]);
    
  
    // get the enemies: all the characters that are not the one who was clicked
    $.each(originalCharacters, function(index, character) {
      if (parseInt(index) !== parseInt(clickedCharacter)) {
        // console.log(index);
        enemies.push(character);
      }  
    });
  
    plyrCharacterChosen = true;
    needToClick = true;
    displayCharacters(".enemies", enemies);
    $(".choose-character").empty();
  
  });
  
  $(".character-enemy").on("click", function() {
    console.log("You clicked an enemy!");  
  });
});
