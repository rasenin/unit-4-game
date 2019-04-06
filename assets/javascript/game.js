$(document).ready(function() {
  $("#restart").hide();

  var obiWan = {
    name: "Obi-Wan Kenobi",
    class: "obi-wan-kenobi",
    image: "assets/images/obi-wan-kenobi.jpeg",
    health: 120,
    baseAttack: 8,
    currAttack: 8,
    counterAttack: 15
  };

  var lukeSkywalker = {
    name: "Luke Skywalker",
    class: "luke-skywalker",
    image: "assets/images/luke-skywalker.jpg",
    health: 100,
    baseAttack: 14,
    currAttack: 14,
    counterAttack: 5
  };

  var darthSid = {
    name: "Darth Sidious",
    class: "darth-sidious",
    image: "assets/images/darth-sidious.png",
    health: 150,
    baseAttack: 5,
    currAttack: 5,
    counterAttack: 20
  };

  var darthMaul = {
    name: "Darth Maul",
    class: "darth-maul",
    image: "assets/images/darth-maul.jpg",
    health: 180,
    baseAttack: 3,
    currAttack: 3,
    counterAttack: 25
  };

  var originalCharacters = [obiWan, lukeSkywalker, darthSid, darthMaul];
  var userCharacter = 0;
  var enemyCharacter = 0;
  var enemies = [];
  var currDefender;

  // keep track of the state of the game
  var displayChars = true;
  var displayCharacter = false;
  var displayEnemies = false;
  var selectNextEnemy = true;
  var gameOver = false;

  function displayCharacters(characters) {
    for (var i = 0; i < characters.length; i++) {
      if (displayChars) {
        // display characters for user to choose
        $("#slot-" + (i + 1)).append("<h4>" + characters[i].name + "</h4>");
        $("#slot-" + (i + 1)).append(
          "<img src=" +
            characters[i].image +
            ' alt="' +
            characters[i].name +
            '" />'
        );
        $("#slot-" + (i + 1)).append("<h4>" + characters[i].health + "</h4>");
        $("#slot-" + (i + 1)).attr("pos", i);
      } else if (displayCharacter) {
        // display character user chose
        $("#slot-5").append("<h4>" + characters[i].name + "</h4>");
        $("#slot-5").append(
          "<img src=" +
            characters[i].image +
            ' alt="' +
            characters[i].name +
            '" />'
        );
        $("#slot-5").append("<h4>" + characters[i].health + "</h4>");
      } else if (displayEnemies) {
        // display enemies available to attack
        $("#slot-" + (i + 6)).append("<h4>" + characters[i].name + "</h4>");
        $("#slot-" + (i + 6)).append(
          "<img src=" +
            characters[i].image +
            ' alt="' +
            characters[i].name +
            '" />'
        );
        $("#slot-" + (i + 6)).append("<h4>" + characters[i].health + "</h4>");
        $("#slot-" + (i + 6)).attr("pos", i);
      } else {
        // display the defender the user is fighting
        $("#slot-9").append("<h4>" + characters[i].name + "</h4>");
        $("#slot-9").append(
          "<img src=" +
            characters[i].image +
            ' alt="' +
            characters[i].name +
            '" />'
        );
        $("#slot-9").append("<h4>" + characters[i].health + "</h4>");
        $(".game-log").empty(); // empty the game log
      }
    }
  }

  displayCharacters(originalCharacters);
  displayChars = false;
  displayCharacter = true;

  $("#slot-5").hide();
  $(".your-character").append(
    '<div class="temp-div" style="height:150px;"></div>'
  );
  $(".enemies").hide();
  $(".defender").hide();

  $(".click-character").on("click", function() {
    // when user clicks on a character

    if (displayCharacter) {
      // if about to display the character that the user chose
      $(".choose-character").hide();
      $(".temp-div").hide();
      $("#slot-5").show();
      userCharacter = $(this).attr("pos");
      displayCharacters([originalCharacters[userCharacter]]);
      displayCharacter = false;
      displayEnemies = true;

      // get the enemies into an array: all the characters that are not the one who was clicked
      $.each(originalCharacters, function(index, character) {
        if (parseInt(index) !== parseInt(userCharacter)) {
          enemies.push(character);
        }
      });

      $(".enemies").show();
      displayCharacters(enemies);
      displayEnemies = false;
    } else if (selectNextEnemy) {
      $(".defender").show();
      $("#slot-9").show();
      $("#slot-9").empty();
      $(".temp-div").hide();
      enemyCharacter = $(this).attr("pos");
      displayCharacters([enemies[enemyCharacter]]);
      currDefender = enemies.splice(enemyCharacter, 1);

      $("#slot-" + (6 + enemies.length)).hide();

      if (enemies.length === 0) {
        $(".enemies").hide();
      }

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

  $("#attack").on("click", function() {
    if (!selectNextEnemy && !gameOver) {
      currDefender[0].health -= originalCharacters[userCharacter].currAttack; // attack enemy

      // display enemy's updated health points
      $("#slot-9").empty();
      displayCharacters(currDefender);

      if (currDefender[0].health <= 0) {
        $("#slot-9").hide();

        $(".defender").append(
          '<div class="temp-div" style="height:150px;"></div>'
        );

        if (enemies.length === 0) {
          $(".game-log").empty();
          $(".game-log").append("<h4>You Won!!!!! GAME OVER!!!</h4>");
          $("#restart").show();
          gameOver = true;
        } else {
          $(".game-log").empty();
          $(".game-log").append(
            "<h4>You have defeated " +
              currDefender[0].name +
              ", you can choose to fight another enemy." +
              "</h4>"
          );
          selectNextEnemy = true;
        }
        originalCharacters[userCharacter].currAttack +=
          originalCharacters[userCharacter].baseAttack; // augment user attack power
        return;
      }

      originalCharacters[userCharacter].health -= currDefender[0].counterAttack; // enemy attacks back

      // display updated health points for user
      $("#slot-5").empty();
      displayCharacter = true;
      displayCharacters([originalCharacters[userCharacter]]);
      displayCharacter = false;

      if (originalCharacters[userCharacter].health <= 0) {
        $(".game-log").append("<h4>You have been defeated! GAME OVER!!!</h4>");
        gameOver = true;
        $("#restart").show();
      } else {
        $(".game-log").append(
          "<h4>You attacked " +
            currDefender[0].name +
            " for " +
            originalCharacters[userCharacter].currAttack +
            " damage." +
            "</h4>"
        );
        $(".game-log").append(
          "<h4>" +
            currDefender[0].name +
            " attacked you back for " +
            currDefender[0].counterAttack +
            " damage." +
            "</h4>"
        );
      }

      originalCharacters[userCharacter].currAttack +=
        originalCharacters[userCharacter].baseAttack; // augment user attack power
    } else if (!gameOver) {
      $(".game-log").empty();
      $(".game-log").append("<h4>No enemy here.</h4>");
    }
  });

  $("#restart").on("click", function() {
    location.reload();
  });
});
