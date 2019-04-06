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
  var displayChars = true;
  var displayCharacter = false;
  var displayEnemies = false;
  var displayDefender = false;
  var selectNextEnemy = true;
  
  function displayCharacters(characters) {
    for (var i = 0; i < characters.length; i++) {
      if (displayChars) { // display characters for user to choose
        $("#slot-" + (i + 1)).append("<h4>" + characters[i].name + "</h4>");
        $("#slot-" + (i + 1)).append("<img src=" + characters[i].image + " alt=\"" + characters[i].name + "\" />");
        $("#slot-" + (i + 1)).append("<h4>" + characters[i].health + "</h4>");
        $("#slot-" + (i + 1)).attr("pos", i); 
      } else if (displayCharacter) { // display character user chose
        $("#slot-5").append("<h4>" + characters[i].name + "</h4>");
        $("#slot-5").append("<img src=" + characters[i].image + " alt=\"" + characters[i].name + "\" />");
        $("#slot-5").append("<h4>" + characters[i].health + "</h4>");
      } else if (displayEnemies) { // display enemies available to attack
        $("#slot-" + (i + 6)).append("<h4>" + characters[i].name + "</h4>");
        $("#slot-" + (i + 6)).append("<img src=" + characters[i].image + " alt=\"" + characters[i].name + "\" />");
        $("#slot-" + (i + 6)).append("<h4>" + characters[i].health + "</h4>");
        $("#slot-" + (i + 6)).attr("pos", i);
      } else if (displayDefender) { // display the defender the user is fighting
        $("#slot-9").append("<h4>" + characters[i].name + "</h4>");
        $("#slot-9").append("<img src=" + characters[i].image + " alt=\"" + characters[i].name + "\" />");
        $("#slot-9").append("<h4>" + characters[i].health + "</h4>");
      }
    }
  }
  
  displayCharacters(originalCharacters);
  displayChars = false;
  displayCharacter = true;
  
  $(".click-character").on("click", function() { // when user clicks on a character

    if(displayCharacter) { // if about to display the character that the user chose
      $(".choose-character").empty();
      var clickedCharacter = $(this).attr("pos");
      displayCharacters([originalCharacters[clickedCharacter]]);
      displayCharacter = false;
      displayEnemies = true;

      // get the enemies into an array: all the characters that are not the one who was clicked
      $.each(originalCharacters, function(index, character) {
        if (parseInt(index) !== parseInt(clickedCharacter)) {
          enemies.push(character);
        }
      });

      displayCharacters(enemies);
      displayEnemies = false;
      displayDefender = true;

    } else if (displayDefender && selectNextEnemy) {
      var clickedCharacter = $(this).attr("pos");
      displayCharacters([enemies[clickedCharacter]]);
      enemies.splice(clickedCharacter, 1);

      // first clear the divs in enemies section
      for (var i = 0; i < 3; i++) {
        $("#slot-" + (i + 6)).empty();
      }

      // redisplay remaining enemies

      displayEnemies = true;
      displayCharacters(enemies);
      displayEnemies = false;
      selectNextEnemy = false;
    }
  });
});
